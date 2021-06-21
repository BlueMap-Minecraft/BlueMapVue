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
import {FileLoader, MathUtils, Vector3} from "three";
import {Map as BlueMapMap} from "bluemap/src/map/Map";
import {alert, animate, EasingFunctions, generateCacheHash} from "bluemap/src/util/Utils";
import {PlayerMarkerManager} from "bluemap/src/markers/PlayerMarkerManager";
import {MarkerFileManager} from "bluemap/src/markers/MarkerFileManager";
import {MainMenu} from "@/js/MainMenu";
import {PopupMarker} from "@/js/PopupMarker";
import {MarkerSet} from "bluemap/src/markers/MarkerSet";
import {getLocalStorage, round, setLocalStorage} from "@/js/Utils";
import i18n from "../i18n";

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

        /** @type {{useCookies: boolean, freeFlightEnabled: boolean, maps: []}} */
        this.settings = null;
        this.savedUserSettings = new Map();

        /** @type BlueMapMap[] */
        this.maps = [];
        /** @type Map<BlueMapMap> */
        this.mapsMap = new Map();

        this.dataUrl = "data/";

        this.mainMenu = new MainMenu();

        this.appState = {
            controls: {
                state: "perspective",
                mouseSensitivity: 1,
                invertMouse: false,
                freeFlightEnabled: false,
            },
            menu: this.mainMenu,
            maps: [],
            theme: null,
            debug: false
        };

        // init
        this.updateControlsSettings();
        this.initGeneralEvents();

        // popup on click
        this.popupMarkerSet = new MarkerSet("bm-popup-set");
        this.popupMarker = new PopupMarker("bm-popup", this.appState, this.events);
        this.popupMarkerSet.add(this.popupMarker);
        this.mapViewer.markers.add(this.popupMarkerSet);

        this.updateLoop = null;

        this.hashUpdateTimeout = null;
        this.viewAnimation = null;
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
        this.appState.controls.freeFlightEnabled = this.settings.freeFlightEnabled;

        // unload loaded maps
        await this.mapViewer.switchMap(null);
        oldMaps.forEach(map => map.dispose());

        // load maps
        this.maps = this.loadMaps();
        for (let map of this.maps) {
            this.mapsMap.set(map.data.id, map);
            this.appState.maps.push(map.data);
        }

        // switch to map
        if (!await this.loadPageAddress()) {
            if (this.maps.length > 0) await this.switchMap(this.maps[0].data.id);
            this.resetCamera();
        }

        // map position address
        window.addEventListener("hashchange", this.loadPageAddress);
        this.events.addEventListener("bluemapCameraMoved", this.cameraMoved);
        this.events.addEventListener("bluemapMapInteraction", this.mapInteraction);

        // start app update loop
        if(this.updateLoop) clearTimeout(this.updateLoop);
        this.updateLoop = setTimeout(this.update, 1000);

        // load user settings
        await this.loadUserSettings();

        // save user settings
        this.saveUserSettings();
    }

    update = async () => {
        await this.followPlayerMarkerWorld();
        this.updateLoop = setTimeout(this.update, 1000);
    }

    async followPlayerMarkerWorld() {
        let player = this.mapViewer.controlsManager.controls ?
            this.mapViewer.controlsManager.controls.data.followingPlayer :
            false;

        if (this.mapViewer.map && player) {
            if (player.world !== this.mapViewer.map.data.world){

                /** @type BlueMapMap */
                let matchingMap = null;
                for (let map of this.maps) {
                    if (map.data.world === player.world) {
                        matchingMap = map;
                        break;
                    }
                }

                if (!matchingMap) {
                    if (this.mapViewer.controlsManager.controls.stopFollowingPlayerMarker)
                        this.mapViewer.controlsManager.controls.stopFollowingPlayerMarker();
                    return;
                }

                await this.switchMap(matchingMap.data.id);
            }
        }
    }

    /**
     * @param mapId {String}
     * @param resetCameraIfNewWorld {boolean}
     * @returns {Promise<void>}
     */
    switchMap(mapId, resetCameraIfNewWorld = false) {
        let map = this.mapsMap.get(mapId);
        if (!map) return Promise.reject(`There is no map with the id "${mapId}" loaded!`);

        let oldWorld = this.mapViewer.map ? this.mapViewer.map.data.world : null;
        return this.mapViewer.switchMap(map).then(() => {
            if (map) {
                this.initPlayerMarkerManager();
                this.initMarkerFileManager();

                if (resetCameraIfNewWorld && map.data.world !== oldWorld) {
                    this.resetCamera();
                }
            }

            this.updatePageAddress();
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
        this.updatePageAddress();
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
            loader.load(this.dataUrl + "settings.json?" + generateCacheHash(),
                resolve,
                () => {},
                () => reject("Failed to load the settings.json!")
            );
        });
    }

    initPlayerMarkerManager() {
        if (!this.mapViewer.map) return;

        if (this.playerMarkerManager) {
            this.playerMarkerManager.worldId = this.mapViewer.map.data.world;
        } else {
            this.playerMarkerManager = new PlayerMarkerManager(this.mapViewer.markers, "live/players", this.mapViewer.map.data.world, this.events);
        }

        this.playerMarkerManager.setAutoUpdateInterval(0);
        this.playerMarkerManager.update()
            .then(() => {
                this.playerMarkerManager.setAutoUpdateInterval(1000);
            })
            .catch(e => {
                alert(this.events, e, "warning");
                this.playerMarkerManager.clear();
                this.playerMarkerManager.dispose();
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
                this.markerFileManager.clear();
                this.markerFileManager.dispose();
            });
    }

    updateControlsSettings() {
        let mouseInvert = this.appState.controls.invertMouse ? -1 : 1;

        this.freeFlightControls.mouseRotate.speedCapture = -1.5 * this.appState.controls.mouseSensitivity;
        this.freeFlightControls.mouseAngle.speedCapture = -1.5 * this.appState.controls.mouseSensitivity * mouseInvert;
        this.freeFlightControls.mouseRotate.speedRight = -2 * this.appState.controls.mouseSensitivity;
        this.freeFlightControls.mouseAngle.speedRight = -2 * this.appState.controls.mouseSensitivity * mouseInvert;
    }

    initGeneralEvents() {
        //close menu on fullscreen
        document.addEventListener("fullscreenchange", evt => {
            if (document.fullscreen) {
                this.mainMenu.closeAll();
            }
        });
    }

    setPerspectiveView(transition = 0, minDistance = 5) {
        if (!this.mapViewer.map) return;
        if (this.viewAnimation) this.viewAnimation.cancel();

        let cm = this.mapViewer.controlsManager;
        cm.controls = null;

        let startDistance = cm.distance;
        let targetDistance = Math.max(5, minDistance, startDistance);

        let startY = cm.position.y;
        let targetY = MathUtils.lerp(this.mapViewer.map.terrainHeightAt(cm.position.x, cm.position.z) + 3, 0, targetDistance / 500);

        let startAngle = cm.angle;
        let targetAngle = Math.min(Math.PI / 2, startAngle, this.mapControls.getMaxPerspectiveAngleForDistance(targetDistance));

        let startOrtho = cm.ortho;
        let startTilt = cm.tilt;

        this.viewAnimation = animate(p => {
            let ep = EasingFunctions.easeInOutQuad(p);
            cm.position.y = MathUtils.lerp(startY, targetY, ep);
            cm.distance = MathUtils.lerp(startDistance, targetDistance, ep);
            cm.angle = MathUtils.lerp(startAngle, targetAngle, ep);
            cm.ortho = MathUtils.lerp(startOrtho, 0, p);
            cm.tilt = MathUtils.lerp(startTilt, 0, ep);
        }, transition, finished => {
            this.mapControls.reset();
            if (finished){
                cm.controls = this.mapControls;
                this.updatePageAddress();
            }
        });

        this.appState.controls.state = "perspective";
    }

    setFlatView(transition = 0, minDistance = 5) {
        if (!this.mapViewer.map) return;
        if (this.viewAnimation) this.viewAnimation.cancel();

        let cm = this.mapViewer.controlsManager;
        cm.controls = null;

        let startDistance = cm.distance;
        let targetDistance = Math.max(5, minDistance, startDistance);

        let startRotation = cm.rotation;
        let startAngle = cm.angle;
        let startOrtho = cm.ortho;
        let startTilt = cm.tilt;

        this.viewAnimation = animate(p => {
            let ep = EasingFunctions.easeInOutQuad(p);
            cm.distance = MathUtils.lerp(startDistance, targetDistance, ep);
            cm.rotation = MathUtils.lerp(startRotation, 0, ep);
            cm.angle = MathUtils.lerp(startAngle, 0, ep);
            cm.ortho = MathUtils.lerp(startOrtho, 1, p);
            cm.tilt = MathUtils.lerp(startTilt, 0, ep);
        }, transition, finished => {
            this.mapControls.reset();
            if (finished){
                cm.controls = this.mapControls;
                this.updatePageAddress();
            }
        });

        this.appState.controls.state = "flat";
    }

    setFreeFlight(transition = 0, targetY = undefined) {
        if (!this.mapViewer.map) return;
        if (!this.settings.freeFlightEnabled) return this.setPerspectiveView(transition);
        if (this.viewAnimation) this.viewAnimation.cancel();

        let cm = this.mapViewer.controlsManager;
        cm.controls = null;

        let startDistance = cm.distance;

        let startY = cm.position.y;
        if (!targetY) targetY = this.mapViewer.map.terrainHeightAt(cm.position.x, cm.position.z) + 3;

        let startAngle = cm.angle;
        let targetAngle = Math.PI / 2;

        let startOrtho = cm.ortho;
        let startTilt = cm.tilt;

        this.viewAnimation = animate(p => {
            let ep = EasingFunctions.easeInOutQuad(p);
            cm.position.y = MathUtils.lerp(startY, targetY, ep);
            cm.distance = MathUtils.lerp(startDistance, 0, ep);
            cm.angle = MathUtils.lerp(startAngle, targetAngle, ep);
            cm.ortho = MathUtils.lerp(startOrtho, 0, Math.min(p * 2, 1));
            cm.tilt = MathUtils.lerp(startTilt, 0, ep);
        }, transition, finished => {
            if (finished){
                cm.controls = this.freeFlightControls;
                this.updatePageAddress();
            }
        });

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

    async updateMap() {
        try {
            this.mapViewer.clearTileCache();
            if (this.mapViewer.map) {
                await this.switchMap(this.mapViewer.map.data.id);
            }
            this.saveUserSettings();
        } catch (e) {
            alert(this.events, e, "error");
        }
    }

    resetSettings() {
        this.saveUserSetting("resetSettings", true);
        location.reload();
    }

    async loadUserSettings(){
        if (!this.settings.useCookies) return;

        if (this.loadUserSetting("resetSettings", false)) {
            alert(this.events, "Settings reset!", "info");
            this.saveUserSettings();
            return;
        }

        this.mapViewer.clearTileCache(this.loadUserSetting("tileCacheHash", this.mapViewer.tileCacheHash));

        this.mapViewer.superSampling = this.loadUserSetting("superSampling", this.mapViewer.data.superSampling);
        this.mapViewer.data.loadedHiresViewDistance = this.loadUserSetting("hiresViewDistance", this.mapViewer.data.loadedHiresViewDistance);
        this.mapViewer.data.loadedLowresViewDistance = this.loadUserSetting("lowresViewDistance", this.mapViewer.data.loadedLowresViewDistance);
        this.mapViewer.updateLoadedMapArea();
        this.appState.controls.mouseSensitivity = this.loadUserSetting("mouseSensitivity", this.appState.controls.mouseSensitivity);
        this.appState.controls.invertMouse = this.loadUserSetting("invertMouse", this.appState.controls.invertMouse);
        this.updateControlsSettings();
        this.setTheme(this.loadUserSetting("theme", this.appState.theme));
        await i18n.setLanguage(this.loadUserSetting("lang", i18n.locale));
        this.setDebug(this.loadUserSetting("debug", this.appState.debug));

        alert(this.events, "Settings loaded!", "info");
    }

    saveUserSettings() {
        if (!this.settings.useCookies) return;

        this.saveUserSetting("resetSettings", false);
        this.saveUserSetting("tileCacheHash", this.mapViewer.tileCacheHash);

        this.saveUserSetting("superSampling", this.mapViewer.data.superSampling);
        this.saveUserSetting("hiresViewDistance", this.mapViewer.data.loadedHiresViewDistance);
        this.saveUserSetting("lowresViewDistance", this.mapViewer.data.loadedLowresViewDistance);
        this.saveUserSetting("mouseSensitivity", this.appState.controls.mouseSensitivity);
        this.saveUserSetting("invertMouse", this.appState.controls.invertMouse);
        this.saveUserSetting("theme", this.appState.theme);
        this.saveUserSetting("lang", i18n.locale);
        this.saveUserSetting("debug", this.appState.debug);

        alert(this.events, "Settings saved!", "info");
    }

    loadUserSetting(key, defaultValue){
        let value = getLocalStorage("bluemap-" + key);

        if (value === undefined) return defaultValue;
        return value;
    }

    saveUserSetting(key, value){
        if (this.savedUserSettings.get(key) !== value){
            this.savedUserSettings.set(key, value);
            setLocalStorage("bluemap-" + key, value);
        }
    }

    cameraMoved = () => {
        if (this.hashUpdateTimeout) clearTimeout(this.hashUpdateTimeout);
        this.hashUpdateTimeout = setTimeout(this.updatePageAddress, 1500);
    }

    updatePageAddress = () => {
        let hash = "#";

        if (this.mapViewer.map) {
            hash += this.mapViewer.map.data.id;

            let controls = this.mapViewer.controlsManager;
            hash += ":" + round(controls.position.x, 0);
            hash += ":" + round(controls.position.y, 0);
            hash += ":" + round(controls.position.z, 0);
            hash += ":" + round(controls.distance, 0);
            hash += ":" + round(controls.rotation, 2);
            hash += ":" + round(controls.angle, 2);
            hash += ":" + round(controls.tilt, 2);
            hash += ":" + round(controls.ortho, 0);
            hash += ":" + this.appState.controls.state;
        }

        history.replaceState(undefined, undefined, hash);

        document.title = i18n.t("pageTitle", {
            map: this.mapViewer.map ? this.mapViewer.map.data.name : "?"
        });
    }

    loadPageAddress = async () => {
        let hash = window.location.hash.substr(1);
        let values = hash.split(":");

        if (values.length !== 10) return false;

        let controls = this.mapViewer.controlsManager;
        controls.controls = null;

        if (!this.mapViewer.map || this.mapViewer.map.data.id !== values[0]) {
            try {
                await this.switchMap(values[0]);
            } catch (e) {
                return false;
            }
        }

        controls.position.x = parseFloat(values[1]);
        controls.position.y = parseFloat(values[2]);
        controls.position.z = parseFloat(values[3]);
        controls.distance = parseFloat(values[4]);
        controls.rotation = parseFloat(values[5]);
        controls.angle = parseFloat(values[6]);
        controls.tilt = parseFloat(values[7]);
        controls.ortho = parseFloat(values[8]);

        switch (values[9]) {
            case "flat" : this.setFlatView(0); break;
            case "free" : this.setFreeFlight(0, controls.position.y); break;
            default : this.setPerspectiveView(0); break;
        }

        return true;
    }

    mapInteraction = event => {
        if (event.detail.data.doubleTap) {
            let cm = this.mapViewer.controlsManager;
            let pos = (event.detail.hit ? event.detail.hit.point : false) || event.detail.object.getWorldPosition(new Vector3());

            let startDistance = cm.distance;
            let targetDistance = Math.max(startDistance * 0.25, 5);

            let startX = cm.position.x;
            let targetX = pos.x;

            let startZ = cm.position.z;
            let targetZ = pos.z;

            this.viewAnimation = animate(p => {
                let ep = EasingFunctions.easeInOutQuad(p);
                cm.distance = MathUtils.lerp(startDistance, targetDistance, ep);
                cm.position.x = MathUtils.lerp(startX, targetX, ep);
                cm.position.z = MathUtils.lerp(startZ, targetZ, ep);
            }, 500);
        }
    }

}