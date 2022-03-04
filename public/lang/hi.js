export default {
    pageTitle: "ब्लूमैप - {मानचित्र}",
    menu: {
        title: "मेन्यू",
        tooltip: "मेन्यू"
    },
    maps: {
        title: "नक्शे",
        button: "नक्शे",
        tooltip: "मानचित्र-सूची"
    },
    markers: {
        title: "मार्करों",
        button: "मार्करों",
        tooltip: "मार्कर-सूची",
        marker: "मार्कर | मार्करों",
        markerSet: "मार्कर-सेट | मार्कर-सेट",
        searchPlaceholder: "खोज...",
        followPlayerTitle: "प्लेयर को फॉलो करें"
    },
    settings: {
        title: "सेटिंग्स",
        button: "सेटिंग्स"
    },
    goFullscreen: {
        button: "पूर्णस्क्रीन मोड"
    },
    resetCamera: {
        button: "कैमरा रीसेट करें",
        tooltip: "कैमरा और स्थिति रीसेट करें"
    },
    updateMap: {
        button: "नक्शा अपडेट करें",
        tooltip: "टाइल कैश साफ़ करें"
    },
    lighting: {
        title: "प्रकाश",
        dayNightSwitch: {
            tooltip: "दिन हो या रात"
        },
        sunlight: "सूरज की रोशनी",
        ambientLight: "परिवेश प्रकाश"
    },
    resolution: {
        title: "संकल्प",
        high: "उच्च (SSAA, x2)",
        normal: "सामान्य (देशी, x1)",
        low: "कम (अप स्केलिंग, x0.5)"
    },
    freeFlightControls: {
        title: "मुक्त उड़ान नियंत्रण",
        mouseSensitivity: "माउस-संवेदनशीलता",
        invertMouseY: "माउस-संवेदनशीलता"
    },
    renderDistance: {
        title: "रेंडर दूरी",
        hiresLayer: "परत काम देता है",
        lowersLayer: "निचली परत"
    },
    theme: {
        title: "थीम",
        default: "डिफ़ॉल्ट (सिस्टम / ब्राउज़र)",
        dark: "डार्क",
        light: "प्रकाश"
    },
    debug: {
        button: "डिबग"
    },
    resetAllSettings: {
        button: "सभी सेटिंग्स रीसेट करें"
    },
    players: {
        title: "खिलाड़ी",
        tooltip: "प्लेयर-सूची"
    },
    compass: {
        tooltip: "कम्पास / फेस नॉर्थ"
    },
    controls: {
        title: "देखें / नियंत्रण",
        perspective: {
            button: "परिप्रेक्ष्य",
            tooltip: "परिप्रेक्ष्य-दृश्य"
        },
        flatView: {
            button: "फ्लैट",
            tooltip: "ऑर्थोग्राफिक / फ्लैट-व्यू",
        },
        freeFlight: {
            button: "Free-Flight",
            tooltip: "Free-Flight / Spectator Mode"
        }
    },
    language: {
        title: "Language",
    },
    blockTooltip: {
        block: "Block",
        position: "Position",
        chunk: "Chunk",
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
	This map has been generated with &#9829; using <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
};
