export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Menu",
        tooltip: "Menu"
    },
    maps: {
        title: "Mapy",
        button: "Mapy",
        tooltip: "Lista map"
    },
    markers: {
        title: "Znaczniki",
        button: "Znaczniki",
        tooltip: "Lista znaczników",
        marker: "znacznik | znaczniki",
        markerSet: "zbiór znaczników | zbiory znaczników",
        searchPlaceholder: "Wyszukaj...",
        followPlayerTitle: "Śledzenie gracza"
    },
    settings: {
        title: "Ustawienia",
        button: "Ustawienia"
    },
    goFullscreen: {
        button: "Tryb pełnoekranowy"
    },
    resetCamera: {
        button: "Wyśrodkuj kamerę",
        tooltip: "Zresetuj pozycję kamery"
    },
    updateMap: {
        button: "Załaduj mapę ponownie",
        tooltip: "Wyczyść pamięć podręczną mapy"
    },
    lighting: {
        title: "Oświetlenie",
        dayNightSwitch: {
            tooltip: "Dzień/Noc"
        },
        sunlight: "Światło słoneczne",
        ambientLight: "Światło otoczenia"
    },
    resolution: {
        title: "Rozdzielczość",
        high: "Wysoka (SSAA, x2)",
        normal: "Normalna (Natywna, x1)",
        low: "Niska (Skalowanie, x0.5)"
    },
    freeFlightControls: {
        title: "Sterowanie w locie swobodnym",
        mouseSensitivity: "Czułość myszy",
        invertMouseY: "Odwróć oś pionową myszy"
    },
    renderDistance: {
        title: "Odległość renderowania",
        hiresLayer: "Warstwa wysokiej rozdzielczości",
        lowersLayer: "Warstwa niskiej rozdzielczości"
    },
    theme: {
        title: "Motyw",
        default: "Domyślny (według ustawień systemowych)",
        dark: "Tryb ciemny",
        light: "Tryb jasny",
        contrast: "Wysoki kontrast"
    },
    debug: {
        button: "Debugowanie"
    },
    resetAllSettings: {
        button: "Przywróć ustawienia domyślne"
    },
    players: {
        title: "Gracze",
        tooltip: "Lista graczy"
    },
    compass: {
        tooltip: "Kompas / zwroć na północ"
    },
    screenshot: {
        title: "Zrzut ekranu",
        button: "Wykonaj zrzut ekranu",
        clipboard: "Skopiuj do schowka"
    },
    controls: {
        title: "Widok",
        perspective: {
            button: "Perspektywa",
            tooltip: "Widok z perspektywy"
        },
        flatView: {
            button: "Płaski",
            tooltip: "Widok płaski",
        },
        freeFlight: {
            button: "Lot swobodny",
            tooltip: "Tryb widza"
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
        button: "Informacje i skróty klawiszowe",
        content: `
<img src="assets/logo.png" style="display: block; width: 40%; margin: 3em auto; border-radius: 50%">
<p>
	<h2>Sterowanie myszką</h2>
	<table>
		<tr><th>Poruszanie się</th><td><kbd>lewy przycisk</kbd> + przeciągnięcie</td></tr>
		<tr><th>Zbliżenie i oddalenie</th><td><kbd>kółko myszy</kbd> (przewijanie)</td></tr>
		<tr><th>Obrót i pochylenie</th><td><kbd>prawy przycisk</kbd> + przeciągnięcie</td></tr>
	</table>
</p>
<br />
<p>
	<h2>Sterowanie klawiaturą</h2>
	<table>
		<tr>
			<th>Poruszanie się</th>
			<td>
				<kbd>Klawisze WASD</kbd>
				<br />
				albo <kbd>Strzałki</kbd>
			</td>
		</tr>
		<tr>
			<th>Zbliżenie i oddalenie</th>
			<td>
				Klawiatura numeryczna: <kbd>+</kbd> / <kbd>-</kbd>
				<br />
				lub <kbd>Insert (Ins)</kbd> / <kbd>Home</kbd>
			</td>
		</tr>
		<tr>
			<th>Obrót i pochylenie</th>
			<td>
				<kbd>Lewy ALT</kbd> + <kbd>WASD</kbd>,
				<br />
				<kbd>Lewy ALT</kbd> + <kbd>Strzałki</kbd>,
				<br /><br />
				Alternatywnie: <kbd>Delete</kbd> / <kbd>End</kbd> / <kbd>Page Up</kbd> / <kbd>Page Down</kbd>
			</td>
		</tr>
	</table>
</p>
<br />
<p>
	<h2>Sterowanie dotykowe (telefon)</h2>
	<table>
		<tr><th>Poruszanie się</th><td>Przeciąganie jednym palcem po ekranie</td></tr>
		<tr><th>Zbliżenie i oddalenie</th><td>Uszczypnięcie dwoma palcami</td></tr>
		<tr><th>Obrót</th><td>Przeciąganie palca po ekranie, jednocześnie trzymając mapę drugim palcem</td></tr>
		<tr><th>Pochylenie</th><td>Przeciąganie dwoma palcami po ekranie w pionie</td></tr>
	</table>
</p>
<br><hr>
<p class="info-footer">
Ta mapa została wygenerowana z &#9829; za pomocą <a href="https://bluecolo.red/bluemap">BlueMap</a> {version}</p>
		`
    }
}
