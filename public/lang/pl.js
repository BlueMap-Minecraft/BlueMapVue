export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Menu",
        tooltip: "Menu"
    },
    maps: {
        title: "Mapy",
        button: "Mapy",
        tooltip: "Lista-Map"
    },
    markers: {
        title: "Punkty",
        button: "Punkty",
        tooltip: "Lista-Punktów",
        marker: "punkt | punkty",
        markerSet: "set-punktów | sety-punktów"
    },
    settings: {
        title: "Opcje",
        button: "Opcje"
    },
    goFullscreen: {
        button: "Idz Na FullScreena"
    },
    resetCamera: {
        button: "Zresetuj Camerę",
        tooltip: "Zresetuj Camerę I Pozycję"
    },
    updateMap: {
        button: "Aktualizuj Mape",
        tooltip: "Wyczyść Chace Mapy"
    },
    lighting: {
        title: "Illuminacja",
        dayNightSwitch: {
            tooltip: "Dzień/Noc"
        },
        sunlight: "Oświetlenie",
        ambientLight: "Oświetlenie-Naturalne"
    },
    resolution: {
        title: "Rezolucja",
        high: "Wysoka (SSAA, x2)",
        normal: "Normalna (Natywna, x1)",
        low: "Słaba (Upscaling, x0.5)"
    },
    freeFlightControls: {
        title: "Kontrola Free-Flight",
        mouseSensitivity: "Sensytywność-Myszki",
        invertMouseY: "Odwruć Y Myszy"
    },
    renderDistance: {
        title: "Dalekość Renderowania",
        hiresLayer: "Layer Wysokiej Rezolucij",
        lowersLayer: "Layer Słabej Rezolucij"
    },
    theme: {
        title: "Motyw",
        default: "Default (Systemu/Browser)",
        dark: "Czarny",
        light: "Biały"
    },
    debug: {
        button: "Debug"
    },
    resetAllSettings: {
        button: "Zresetuj Opcje"
    },
    players: {
        title: "Gracze",
        tooltip: "Lista-Graczy"
    },
    compass: {
        tooltip: "Kompas / Na Północ"
    },
    controls: {
        title: "Widok / Kontrole",
        perspective: {
            button: "Prospektywa",
            tooltip: "Visuale-Prospektywa"
        },
        flatView: {
            button: "Płaski",
            tooltip: "Ortograficzna / Widok-Płaski",
        },
        freeFlight: {
            button: "Free-Flight",
            tooltip: "Free-Flight / Tryb Widza"
        }
    },
    language: {
        title: "Język",
    },
    blockTooltip: {
        block: "Blok",
        position: "Pozycja",
        chunk: "Chunk",
        region: {
            region: "Region",
            file: "Plik"
        },
        light: {
            light: "Oświetlenie",
            sun: "Słońce",
            block: "Blok",
        }
    },
    info: {
        title: "Informacje",
        button: "Informacje",
        content: `
<img src="assets/logo.png" style="display: block; width: 40%; margin: 3em auto; border-radius: 50%">
<p>
	<h2>Kontrole-Myszki:</h2>
	<table>
		<tr><th>ruch</th><td><kbd>przycisk-lewy</kbd> + przesuwanie</td></tr>
		<tr><th>zoom</th><td><kbd>kółko</kbd> (przewijai)</td></tr>
		<tr><th>obrót / nachylenie</th><td><kbd>przycisk-prawy</kbd> + przesuwanie</td></tr>
	</table>
</p>
<p>
	<h2>Kontrolowanie-Klawiaturą:</h2>
	<table>
		<tr><th>ruch</th><td><kbd>wasd</kbd> / <kbd>przyciski-strzałki</kbd></td></tr>
		<tr><th>zoom</th><td>Numpad: <kbd>+</kbd>/<kbd>-</kbd> czy <kbd>Ins</kbd>/<kbd>Home</kbd></td></tr>
		<tr><th>obrót / nachylenie</th><td><kbd>Alt-Sinistro</kbd> + <kbd>wasd</kbd> / <kbd>przyciski-strzałki</kbd> czy <kbd>Usuń</kbd>/<kbd>Zakończ</kbd>/<kbd>Strona Do Góry</kbd>/<kbd>Strona Do Dołu</kbd></td></tr>
	</table>
</p>
<p>
	<h2>Controlowanie-Dotykiem:</h2>
	<table>
		<tr><th>ruch</th><td>dotyk + przewijanie</td></tr>
		<tr><th>zoom</th><td>dotyk dwoma palcami + rozciągnięcie</td></tr>
		<tr><th>obrót / nachylenie</th><td>dotyk dwoma palcami + obrót / ruch do góry/dołu</td></tr>
	</table>
</p>
<br><hr>
<p>
	Ta mapa została zgenerowana przez &#9829; używąjac <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
}
