/*
 * This file is part of BlueMap, licensed under the MIT License (MIT).
 *
 * Copyright (c) Blue (Lukas Rieger) <https://bluecolored.de>
 * Copyright (c) contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import "bluemap/src/BlueMap";
import {MapViewer} from "bluemap/src/MapViewer";
import {MapControls} from "bluemap/src/controls/map/MapControls";
import {FreeFlightControls} from "bluemap/src/controls/freeflight/FreeFlightControls";
import {FileLoader} from "three";
import {Map as BlueMapMap} from "bluemap/src/map/Map";
import {alert} from "bluemap/src/util/Utils";
import {PlayerMarkerManager} from "bluemap/src/markers/PlayerMarkerManager";
import {MarkerFileManager} from "bluemap/src/markers/MarkerFileManager";
import {MainMenu} from "@/js/MainMenu";
import {PopupMarker} from "@/js/PopupMarker";
import {MarkerSet} from "bluemap/src/markers/MarkerSet";
import {getCookie, setCookie} from "@/js/Utils";

export class BlueMapApp {

    /**
     * @param rootElement {Element}
     */
    constructor(rootElement) {
        this.events = rootElement;

        this.mapViewer = new MapViewer(rootElement, this.events);

        this.mapControls = new MapControls(this.mapViewer.renderer.domElement);
        this.freeFlightControls = new FreeFlightControls(this.mapViewer.renderer.domElement);

        /** @type {PlayerMarkerManager} */
        this.playerMarkerManager = null;
        /** @type {MarkerFileManager} */
        this.markerFileManager = null;

        /** @type {{useCookies: boolean, maps: []}} */
        this.settings = null;
        this.savedUserSettings = new Map();

        this.maps = [];
        this.mapsMap = new Map();

        this.dataUrl = "data/";

        this.mainMenu = new MainMenu();

        this.appState = {
            controls: {
                state: "perspective",
                mouseSensitivity: 1,
                invertMouse: false,
            },
            menu: this.mainMenu,
            maps: [],
            theme: null,
            debug: false
        };

        // init
        this.updateControlsSettings();

        // popup on click
        this.popupMarkerSet = new MarkerSet("bm-popup-set");
        this.popupMarker = new PopupMarker("bm-popup", this.appState, this.events);
        this.popupMarkerSet.add(this.popupMarker);
        this.mapViewer.markers.add(this.popupMarkerSet);
    }


    /**
     * @returns {Promise<void|never>}
     */
    async load() {
        let oldMaps = this.maps;
        this.maps = [];
        this.appState.maps.splice(0, this.appState.maps.length);
        this.mapsMap.clear();

        // load settings
        await this.getSettings();

        // unload loaded maps
        await this.mapViewer.switchMap(null);
        oldMaps.forEach(map => map.dispose());

        // load maps
        this.maps = this.loadMaps();
        for (let map of this.maps) {
            this.mapsMap.set(map.data.id, map);
            this.appState.maps.push(map.data);
        }

        // switch to new map
        if (this.maps.length > 0) {
            this.switchMap(this.maps[0].data.id)
                .catch(err => {
                    alert(this.events, "Failed to switch to map: " + err.toString(), "error");
                });
        }

        // load user settings
        this.loadUserSettings();
    }

    /**
     * @param mapId {String}
     * @returns {Promise<void>}
     */
    switchMap(mapId) {
        let map = this.mapsMap.get(mapId);
        if (!map) return Promise.reject(`There is no map with the id "${mapId}" loaded!`);

        let oldWorld = this.mapViewer.map ? this.mapViewer.map.data.world : null;

        return this.mapViewer.switchMap(map).then(() => {
            if (map && map.data.world !== oldWorld) {
                this.initPlayerMarkerManager();
                this.initMarkerFileManager();
            }

            this.resetCamera();
        });
    }

    resetCamera() {
        let map = this.mapViewer.map;
        let controls = this.mapViewer.controlsManager;

        if (map) {
            controls.position.set(map.data.startPos.x, 0, map.data.startPos.z);
            controls.distance = 500;
            controls.angle = 0;
            controls.rotation = 0;
            controls.tilt = 0;
            controls.ortho = 0;
        }

        controls.controls = this.mapControls;
        this.appState.controls.state = "perspective";
    }

    /**
     * @returns BlueMapMap[]
     */
    loadMaps() {
        let settings = this.settings;
        let maps = [];

        // create maps
        if (settings.maps !== undefined){
            for (let mapId in settings.maps) {
                if (!Object.prototype.hasOwnProperty.call(settings.maps, mapId)) continue;

                let mapSettings = settings.maps[mapId];
                if (mapSettings.enabled) {
                    let map = new BlueMapMap(mapId, this.dataUrl + mapId + "/", this.dataUrl + "settings.json", this.dataUrl + "textures.json", this.mapViewer.events);
                    maps.push(map);

                    map.loadSettings()
                        .catch(error => {
                            alert(this.events, `Failed to load settings for map '${map.data.id}':` + error, "warning");
                        });
                }
            }
        }

        // sort maps
        maps.sort((map1, map2) => {
            let sort = settings.maps[map1.data.id].ordinal - settings.maps[map2.data.id].ordinal;
            if (isNaN(sort)) return 0;
            return sort;
        });

        return maps;
    }

    async getSettings() {
        if (!this.settings){
            this.settings = await this.loadSettings();
        }

        return this.settings;
    }

    /**
     * @returns {Promise<Object>}
     */
    loadSettings() {
        return new Promise((resolve, reject) => {
            let loader = new FileLoader();
            loader.setResponseType("json");
            loader.load(this.dataUrl + "settings.json",
                resolve,
                () => {},
                () => reject("Failed to load the settings.json!")
            );
        });
    }

    initPlayerMarkerManager() {
        if (this.playerMarkerManager) {
            this.playerMarkerManager.clear();
            this.playerMarkerManager.dispose();
        }

        if (!this.mapViewer.map) return;

        this.playerMarkerManager = new PlayerMarkerManager(this.mapViewer.markers, "live/players", this.mapViewer.map.data.world, this.events);
        this.playerMarkerManager.update()
            .then(() => {
                this.playerMarkerManager.setAutoUpdateInterval(1000);
            })
            .catch(e => {
                alert(this.events, e, "warning");
            });
    }

    initMarkerFileManager() {
        if (this.markerFileManager) {
            this.markerFileManager.clear();
            this.markerFileManager.dispose();
        }

        if (!this.mapViewer.map) return;

        this.markerFileManager = new MarkerFileManager(this.mapViewer.markers, "data/markers.json", this.mapViewer.map.data.id, this.events);
        this.markerFileManager.update()
            .then(() => {
                this.markerFileManager.setAutoUpdateInterval(1000 * 10);
            })
            .catch(e => {
                alert(this.events, e, "warning");
            });
    }

    updateControlsSettings() {
        let mouseInvert = this.appState.controls.invertMouse ? -1 : 1;

        this.freeFlightControls.mouseRotate.speedCapture = -0.002 * this.appState.controls.mouseSensitivity;
        this.freeFlightControls.mouseAngle.speedCapture = -0.002 * this.appState.controls.mouseSensitivity * mouseInvert;
        this.freeFlightControls.mouseRotate.speedRight = -0.002 * this.appState.controls.mouseSensitivity;
        this.freeFlightControls.mouseAngle.speedRight = -0.002 * this.appState.controls.mouseSensitivity * mouseInvert;
    }

    setPerspectiveView() {
        if (this.mapViewer.controlsManager.controls !== this.mapControls) {
            this.mapViewer.controlsManager.controls = this.mapControls;
        } else {
            this.mapControls.setPerspectiveView();
        }
        this.appState.controls.state = "perspective";
    }

    setFlatView() {
        if (this.mapViewer.controlsManager.controls !== this.mapControls) {
            this.mapViewer.controlsManager.controls = this.mapControls;
        }
        this.mapControls.setOrthographicView();
        this.appState.controls.state = "flat";
    }

    setFreeFlight() {
        this.mapViewer.controlsManager.controls = this.freeFlightControls;
        this.appState.controls.state = "free";
    }

    setDebug(debug) {
        this.appState.debug = debug;

        if (debug){
            this.mapViewer.stats.showPanel(0);
        } else {
            this.mapViewer.stats.showPanel(-1);
        }
    }

    setTheme(theme) {
        this.appState.theme = theme;

        if (theme === "light") {
            this.mapViewer.rootElement.classList.remove("theme-dark");
            this.mapViewer.rootElement.classList.add("theme-light");
        }
        else if (theme === "dark") {
            this.mapViewer.rootElement.classList.remove("theme-light");
            this.mapViewer.rootElement.classList.add("theme-dark");
        }
        else {
            this.mapViewer.rootElement.classList.remove("theme-light");
            this.mapViewer.rootElement.classList.remove("theme-dark");
        }
    }

    resetSettings() {
        this.saveUserSetting("resetSettings", true);
        location.reload();
    }

    loadUserSettings(){
        if (!this.settings.useCookies) return;

        if (this.loadUserSetting("resetSettings", false)) {
            alert(this.events, "Settings reset!", "info");
            this.saveUserSettings();
            return;
        }

        this.mapViewer.superSampling = this.loadUserSetting("superSampling", this.mapViewer.data.superSampling);
        this.mapViewer.data.loadedHiresViewDistance = this.loadUserSetting("hiresViewDistance", this.mapViewer.data.loadedHiresViewDistance);
        this.mapViewer.data.loadedLowresViewDistance = this.loadUserSetting("lowresViewDistance", this.mapViewer.data.loadedLowresViewDistance);
        this.mapViewer.updateLoadedMapArea();
        this.appState.controls.mouseSensitivity = this.loadUserSetting("mouseSensitivity", this.appState.controls.mouseSensitivity);
        this.appState.controls.invertMouse = this.loadUserSetting("invertMouse", this.appState.controls.invertMouse);
        this.updateControlsSettings();
        this.setTheme(this.loadUserSetting("theme", this.appState.theme));
        this.setDebug(this.loadUserSetting("debug", this.appState.debug));

        alert(this.events, "Settings loaded!", "info");
    }

    saveUserSettings() {
        if (!this.settings.useCookies) return;

        this.saveUserSetting("resetSettings", false);

        this.saveUserSetting("superSampling", this.mapViewer.data.superSampling);
        this.saveUserSetting("hiresViewDistance", this.mapViewer.data.loadedHiresViewDistance);
        this.saveUserSetting("lowresViewDistance", this.mapViewer.data.loadedLowresViewDistance);
        this.saveUserSetting("mouseSensitivity", this.appState.controls.mouseSensitivity);
        this.saveUserSetting("invertMouse", this.appState.controls.invertMouse);
        this.saveUserSetting("theme", this.appState.theme);
        this.saveUserSetting("debug", this.appState.debug);

        alert(this.events, "Settings saved!", "info");
    }

    loadUserSetting(key, defaultValue){
        let value = getCookie("bluemap-" + key);

        if (value === undefined) return defaultValue;
        return value;
    }

    saveUserSetting(key, value){
        if (this.savedUserSettings.get(key) !== value){
            this.savedUserSettings.set(key, value);
            setCookie("bluemap-" + key, value);
        }
    }

}