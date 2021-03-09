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

        let unloadPromise = this.mapViewer.switchMap(null)
            .then(() => {
                oldMaps.forEach(map => map.dispose());
            });

        let loadPromise = this.loadMaps()
            .then(maps => {
                this.maps = maps;
                for (let map of maps) {
                    this.mapsMap.set(map.data.id, map);
                    this.appState.maps.push(map.data);
                }
            })

        try {
            await unloadPromise;
            await loadPromise;
        } catch (err) {
            alert(this.events, "Failed to load map: " + err.toString(), "error");
            return;
        }

        if (this.maps.length > 0) {
            this.switchMap(this.maps[0].data.id)
                .catch(err => {
                    alert(this.events, "Failed to switch to map: " + err.toString(), "error");
                });
        }
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
     * @returns {Promise<BlueMapMap[]>}
     */
    loadMaps() {
        return this.loadSettings().then(settings => {
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
        });
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

}