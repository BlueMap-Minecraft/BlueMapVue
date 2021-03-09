import {Marker} from "bluemap/src/markers/Marker";
import {CSS2DObject} from "bluemap/src/util/CSS2DRenderer";
import {animate, htmlToElement} from "bluemap/src/util/Utils";
import {BoxGeometry, MeshBasicMaterial, Mesh, Vector2} from "three";

export class PopupMarker extends Marker {

    constructor(id, appState, events) {
        super(id);

        this.data.type = "popup";
        this.data.label = "Last Map Interaction";

        this.appState = appState;
        this.events = events;
        this.visible = false;

        this.elementObject = new CSS2DObject(htmlToElement(`<div id="bm-marker-${this.data.id}" class="bm-marker-${this.data.type}">Test</div>`));
        this.elementObject.position.set(0.5, 1, 0.5);
        this.addEventListener( 'removed', () => {
            if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
        });

        let cubeGeo = new BoxGeometry(1.01, 1.01, 1.01).translate(0.5, 0.5, 0.5);
        let cubeMaterial = new MeshBasicMaterial( {color: 0xffffff, opacity: 0.5, transparent: true} );
        this.cube = new Mesh(cubeGeo, cubeMaterial);
        this.cube.onClick = evt => this.onClick(evt);

        this.add(this.elementObject);
        this.add(this.cube);

        this.animation = null;

        this.events.addEventListener('bluemapMapInteraction', this.onMapInteraction);

        window.addEventListener("mousedown", this.removeHandler);
        window.addEventListener("touchstart", this.removeHandler);
        window.addEventListener("keydown", this.removeHandler);
        window.addEventListener("mousewheel", this.removeHandler);
    }

    onClick(event) {
        return true;
    }

    onMapInteraction = evt => {
        let isHires = true;
        let int = evt.detail.hiresHit;

        if (!int) {
            isHires = false;
            int = evt.detail.lowresHit;
        }

        if (!int) return;

        this.position
            .copy(int.pointOnLine || int.point)
            .add(evt.detail.ray.direction.clone().multiplyScalar(0.05))
            .floor();

        //this.elementObject.position
            //.copy(evt.detail.intersection.pointOnLine || evt.detail.intersection.point)
            //.sub(this.position);

        console.log(int);

        if (isHires) {
            this.element.innerHTML = `
                <div class="group">
                    <div class="label">Block:</div>
                    <div class="content">
                        <div class="entry"><span class="label">x: </span><span class="value">${this.position.x}</span></div>
                        <div class="entry"><span class="label">y: </span><span class="value">${this.position.y}</span></div>
                        <div class="entry"><span class="label">z: </span><span class="value">${this.position.z}</span></div>
                    </div>
                </div>
            `;
        } else {
            this.element.innerHTML = `
                <div class="group">
                    <div class="label">Position:</div>
                    <div class="content">
                        <div class="entry"><span class="label">x: </span><span class="value">${this.position.x}</span></div>
                        <div class="entry"><span class="label">z: </span><span class="value">${this.position.z}</span></div>
                    </div>
                </div>
            `;
        }

        if (this.appState.debug) {
            let chunkCoords = this.position.clone().divideScalar(16).floor();
            let regionCoords = new Vector2(this.position.x, this.position.z).divideScalar(512).floor();
            let regionFile = `r.${regionCoords.x}.${regionCoords.y}.mca`;

            this.element.innerHTML += `
                <hr>
                <div class="group">
                    <div class="label">Chunk:</div>
                    <div class="content">
                        <div class="entry"><span class="label">x: </span><span class="value">${chunkCoords.x}</span></div>
                        <div class="entry"><span class="label">y: </span><span class="value">${chunkCoords.y}</span></div>
                        <div class="entry"><span class="label">z: </span><span class="value">${chunkCoords.z}</span></div>
                    </div>
                </div>
                <hr>
                <div class="group">
                    <div class="label">Region:</div>
                    <div class="content">
                        <div class="entry"><span class="label">x: </span><span class="value">${regionCoords.x}</span></div>
                        <div class="entry"><span class="label">z: </span><span class="value">${regionCoords.y}</span></div>
                    </div>
                    <div class="content">
                        <div class="entry"><span class="label">File: </span><span class="value">${regionFile}</span></div>
                    </div>
                </div>
            `;
        }

        if (this.appState.debug) {
            let faceIndex = int.faceIndex;
            let attributes = int.object.geometry.attributes;
            if (attributes.sunlight && attributes.blocklight) {
                let sunlight = attributes.sunlight.array[faceIndex * 3];
                let blocklight = attributes.blocklight.array[faceIndex * 3];

                this.element.innerHTML += `
                    <hr>
                    <div class="group">
                        <div class="label">Light:</div>
                        <div class="content">
                            <div class="entry"><span class="label">Sun: </span><span class="value">${sunlight}</span></div>
                            <div class="entry"><span class="label">Block: </span><span class="value">${blocklight}</span></div>
                        </div>
                    </div>
                `;
            }
        }

        if (this.appState.debug) {
            let info = "";

            if (isHires) {
                let hrPath = evt.detail.hiresHit.object.userData.tileUrl;
                info += `<div>${hrPath}</div>`;
            }

            let lrPath = evt.detail.lowresHit.object.userData.tileUrl;
            info += `<div>${lrPath}</div>`;

            this.element.innerHTML += `
                <hr>
                <div class="files">
                    ${info}
                </div>
            `;
        }

        this.open();
    };

    open() {
        if (this.animation) this.animation.cancel();

        this.visible = true;
        this.cube.visible = true;

        let targetOpacity = 1;

        this.element.style.opacity = "0";
        this.animation = animate(progress => {
            this.element.style.opacity = (progress * targetOpacity).toString();
        }, 300);
    }

    removeHandler = evt => {
        if (evt.composedPath().includes(this.element)) return;
        this.close();
    }

    close() {
        if (this.animation) this.animation.cancel();

        this.cube.visible = false;

        let startOpacity = parseFloat(this.element.style.opacity);
        this.animation = animate(progress => {
            this.element.style.opacity = (startOpacity - progress * startOpacity).toString();
        }, 300, finished => {
            if (finished) this.visible = false;
        });
    }

    /**
     * @returns {Element}
     */
    get element() {
        return this.elementObject.element.getElementsByTagName("div")[0];
    }

    dispose() {
        super.dispose();

        if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
    }

}