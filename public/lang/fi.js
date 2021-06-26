export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Valikko",
        tooltip: "Valikko"
    },
    maps: {
        title: "Kartat",
        button: "Kartat",
        tooltip: "Karttalista"
    },
    markers: {
        title: "Merkit",
        button: "Merkit",
        tooltip: "Merkkilista",
        marker: "merkki | merkkiä",
        markerSet: "merkkisetti | merkkisettiä",
        searchPlaceholder: "Etsi...",
        followPlayerTitle: "Seuraa pelaajaa"
    },
    settings: {
        title: "Asetukset",
        button: "Asetukset"
    },
    goFullscreen: {
        button: "Mene kokoruudun tilaan"
    },
    resetCamera: {
        button: "Nollaa kamera",
        tooltip: "Nolla kamera ja sijainti"
    },
    updateMap: {
        button: "Päivitä kartta",
        tooltip: "Tyhjennä välimuisti"
    },
    lighting: {
        title: "Valaistus",
        dayNightSwitch: {
            tooltip: "Päivä/Yö"
        },
        sunlight: "Auringonvalo",
        ambientLight: "Ympäristön valo"
    },
    resolution: {
        title: "Resoluutio",
        high: "Korkea (SSAA, x2)",
        normal: "Normaali (Natiivi, x1)",
        low: "Alhainen (Skaalaus, x0.5)"
    },
    freeFlightControls: {
        title: "Vapaan Lennon Ohjaimet",
        mouseSensitivity: "Hiiren Herkkyys",
        invertMouseY: "Käännä Hiiren Y"
    },
    renderDistance: {
        title: "Näköetäisyys",
        hiresLayer: "Korkea laatuinen kerros",
        lowersLayer: "Matala laatuinen kerros"
    },
    theme: {
        title: "Teema",
        default: "Oletus (Järjestelmä/Selain)",
        dark: "Tumma",
        light: "Vaalea"
    },
    debug: {
        button: "Debug"
    },
    resetAllSettings: {
        button: "Nollaa Kaikki Asetukset"
    },
    players: {
        title: "Pelaajat",
        tooltip: "Pelaajalista"
    },
    compass: {
        tooltip: "Kompassi / Katso Pohjoiseen"
    },
    controls: {
        title: "Näkymä / Ohjaus",
        perspective: {
            button: "Perspektiivi",
            tooltip: "Perspektiivi näkymä"
        },
        flatView: {
            button: "Tasainen",
            tooltip: "Ortografinen  / Tasainen näkymä",
        },
        freeFlight: {
            button: "Vapaa lento",
            tooltip: "Vapaa lento / Katsojatila"
        }
    },
    language: {
        title: "Kieli",
    },
    blockTooltip: {
        block: "Kuutio",
        position: "Sijainti",
        chunk: "Lohko",
        region: {
            region: "Alue",
            file: "Tiedosto"
        },
        light: {
            light: "Valo",
            sun: "Aurinko",
            block: "Kuutio",
        }
    },
    info: {
        title: "Tiedot",
        button: "Tiedot",
        content: `
<img src="assets/logo.png" style="display: block; width: 40%; margin: 3em auto; border-radius: 50%">
<p>
	<h2>Hiiriasetukset:</h2>
	<table>
		<tr><th>liiku</th><td><kbd>vasen painallus</kbd> + vedä</td></tr>
		<tr><th>zoomaa</th><td><kbd>hiiren rulla</kbd> (rullaa)</td></tr>
		<tr><th>käänny / kallista</th><td><kbd>oikea painallus</kbd> + vedä</td></tr>
	</table>
</p>
<p>
	<h2>Näppäimistöasetukset:</h2>
	<table>
		<tr><th>liiku</th><td><kbd>wasd</kbd> / <kbd>nuolinäppäimet</kbd></td></tr>
		<tr><th>zoomaa</th><td>Numero näppäimistö: <kbd>+</kbd>/<kbd>-</kbd> tai <kbd>Ins-näppäin</kbd>/<kbd>Home-näppäin</kbd></td></tr>
		<tr><th>käänny / kallista</th><td><kbd>Vasen-Alt</kbd> + <kbd>wasd</kbd> / <kbd>nuolinäppäimet</kbd> tai <kbd>Delete-näppäin</kbd>/<kbd>End-näppäin</kbd>/<kbd>Page Up -näppäin</kbd>/<kbd>Page Down -näppäin</kbd></td></tr>
	</table>
</p>
<p>
	<h2>Kosketusasetukset:</h2>
	<table>
		<tr><th>liiku</th><td>kosketa + vedä</td></tr>
		<tr><th>zoomaa</th><td>kosketa kahdella sormella + nipistä</td></tr>
		<tr><th>käänny / kallista</th><td>kosketa kahdella sormella + käännä / liiku ylös/alas</td></tr>
	</table>
</p>
<br><hr>
<p>
    Tämä kartta on tehty rakkaudella &#9829; käyttäen <a href="https://bluecolo.red/bluemap">BlueMap</a> -ohjelmaa.
</p>
		`
    }
};
