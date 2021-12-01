export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Menü",
        tooltip: "Menü"
    },
    maps: {
        title: "Térképek",
        button: "Térképek",
        tooltip: "Térképlista"
    },
    markers: {
        title: "Jelölők",
        button: "Jelölők",
        tooltip: "Jelölőlista",
        marker: "jelölő | jelölők",
        markerSet: "jelölőkészlet | jelölőkészletek",
        searchPlaceholder: "Keresés...",
        followPlayerTitle: "Játékos követése"
    },
    settings: {
        title: "Beállítások",
        button: "Beállítások"
    },
    goFullscreen: {
        button: "Teljes képernyős mód bekapcsolása"
    },
    resetCamera: {
        button: "Kamera visszaállítása",
        tooltip: "Kamera & pozíció visszaállítása"
    },
    updateMap: {
        button: "Térkép frissítése",
        tooltip: "Csempe gyorsítótárának törlése"
    },
    lighting: {
        title: "Villámlás",
        dayNightSwitch: {
            tooltip: "Reggel/Éjszaka"
        },
        sunlight: "Napfény",
        ambientLight: "Háttérvilágítás"
    },
    resolution: {
        title: "Felbontás",
        high: "Magas (SSAA, x2)",
        normal: "Normál (Native, x1)",
        low: "Alacsony (Upscaling, x0.5)"
    },
    freeFlightControls: {
        title: "Szabadrepülési vezérlők",
        mouseSensitivity: "Egér érzékenység",
        invertMouseY: "Egér Y tengelyének invertálása"
    },
    renderDistance: {
        title: "Látótávolság",
        hiresLayer: "Hires réteg",
        lowersLayer: "Lowres réteg"
    },
    theme: {
        title: "Téma",
        default: "Alapértelmezett (Rendszer/Böngésző)",
        dark: "Sötét",
        light: "Világos"
    },
    debug: {
        button: "Hibakeresés"
    },
    resetAllSettings: {
        button: "Minden beállítás alaphelyzetbe állítása"
    },
    players: {
        title: "Játékosok",
        tooltip: "Játékos lista"
    },
    compass: {
        tooltip: "Iránytű / Északra fordulás"
    },
    controls: {
        title: "Nézet / Vezérlés",
        perspective: {
            button: "Perspektivikus",
            tooltip: "Perspektivikus nézet"
        },
        flatView: {
            button: "Lapos",
            tooltip: "Orthographic / Lapos nézet",
        },
        freeFlight: {
            button: "Szabadrepülés",
            tooltip: "Szabadrepülési / Szemlélő mód"
        }
    },
    language: {
        title: "Nyelv",
    },
    blockTooltip: {
        block: "Blokk",
        position: "Pozíció",
        chunk: "Chunk",
        region: {
            region: "Régió",
            file: "Fájl"
        },
        light: {
            light: "Fény",
            sun: "Nap",
            block: "Blokk",
        }
    },
    info: {
        title: "Infó",
        button: "Infó",
        content: `
<img src="assets/logo.png" style="display: block; width: 40%; margin: 3em auto; border-radius: 50%">
<p>
	<h2>Mouse-Controls:</h2>
	<table>
		<tr><th>move</th><td><kbd>left-click</kbd> + drag</td></tr>
		<tr><th>zoom</th><td><kbd>mousewheel</kbd> (scroll)</td></tr>
		<tr><th>rotate / tilt</th><td><kbd>right-click</kbd> + drag</td></tr>
	</table>
</p>
<p>
	<h2>Keyboard-Controls:</h2>
	<table>
		<tr><th>move</th><td><kbd>wasd</kbd> / <kbd>arrow-keys</kbd></td></tr>
		<tr><th>zoom</th><td>Numpad: <kbd>+</kbd>/<kbd>-</kbd> or <kbd>Ins</kbd>/<kbd>Home</kbd></td></tr>
		<tr><th>rotate / tilt</th><td><kbd>Left-Alt</kbd> + <kbd>wasd</kbd> / <kbd>arrow-keys</kbd> or <kbd>Delete</kbd>/<kbd>End</kbd>/<kbd>Page Up</kbd>/<kbd>Page Down</kbd></td></tr>
	</table>
</p>
<p>
	<h2>Touch-Controls:</h2>
	<table>
		<tr><th>move</th><td>touch + drag</td></tr>
		<tr><th>zoom</th><td>touch with two fingers + pinch</td></tr>
		<tr><th>rotate / tilt</th><td>touch with two fingers + rotate / move up/down</td></tr>
	</table>
</p>
<br><hr>
<p>
	This map has been generated with &#9829; using <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
};
