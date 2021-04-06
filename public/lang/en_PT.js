export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Menu",
        tooltip: "Menu"
    },
    maps: {
        title: "Treasure Maps",
        button: "Treasure Maps",
        tooltip: "List of Treasure Maps"
    },
    markers: {
        title: "Xes to mark the spots",
        button: "Xes to mark the spots",
        tooltip: "List o' Xes",
        marker: "spot | spots",
        markerSet: "marker-set | marker-sets",
        searchPlaceholder: "Search..."
    },
    settings: {
        title: "Settin's",
        button: "Settin's"
    },
    goFullscreen: {
        button: "Go to Biggarrr View"
    },
    resetCamera: {
        button: "Reset yer Camera",
        tooltip: "Reset yer Camera & Position"
    },
    updateMap: {
        button: "Update Treasure Map",
        tooltip: "Clear Tile Cache"
    },
    lighting: {
        title: "Lightin'",
        dayNightSwitch: {
            tooltip: "Day/Night"
        },
        sunlight: "Light o' the sun",
        ambientLight: "Ambient-Light"
    },
    resolution: {
        title: "Diameter o' eyepatch",
        high: "High (SSAA, x2)",
        normal: "Normal (Native, x1)",
        low: "Low (Upscaling, x0.5)"
    },
    freeFlightControls: {
        title: "Free-Flight Controls",
        mouseSensitivity: "Mouse-Sensitivity",
        invertMouseY: "Turn the vertical cheese munchin' critter right 'round"
    },
    renderDistance: {
        title: "Distance to the edge of the horizon",
        hiresLayer: "Well-drawn treasure map",
        lowersLayer: "Quickly sketched treasure map"
    },
    theme: {
        title: "Theme",
        default: "Default (System/Browser)",
        dark: "Dark",
        light: "Light"
    },
    debug: {
        button: "Ship inspector"
    },
    resetAllSettings: {
        button: "Reset all yer Settin's"
    },
    players: {
        title: "Buccaneers",
        tooltip: "List o' Buccaneers"
    },
    compass: {
        tooltip: "Compass / Face North"
    },
    controls: {
        title: "View / Controls",
        perspective: {
            button: "Perspective",
            tooltip: "Perspective-View"
        },
        flatView: {
            button: "Flat",
            tooltip: "Orthographic / Flat-View",
        },
        freeFlight: {
            button: "Free-Flight",
            tooltip: "Free-Flight / Spectator Mode"
        }
    },
    language: {
        title: "Lingo",
    },
    blockTooltip: {
        block: "Block",
        position: "Coordinates",
        chunk: "Hunk",
        region: {
            region: "Region",
            file: "File"
        },
        light: {
            light: "Light",
            sun: "Sun",
            block: "Block",
        }
    },
    info: {
        title: "Info",
        button: "Info",
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
	This treasure map has been generated with &#🏴‍☠️; using <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
}