export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "Меню",
        tooltip: "Меню"
    },
    maps: {
        title: "Карта",
        button: "Карта",
        tooltip: "Список карт"
    },
    markers: {
        title: "Маркеры",
        button: "Маркеры",
        tooltip: "Список маркеров",
        marker: "маркер | маркеры",
        markerSet: "набор маркеров | наборы маркеров"
    },
    settings: {
        title: "Настройки",
        button: "Настройки"
    },
    goFullscreen: {
        button: "Полноэкранный режим"
    },
    resetCamera: {
        button: "Сброс настроек камеры",
        tooltip: "Сбросить настройки и положение камеры"
    },
    updateMap: {
        button: "Обновить карту",
        tooltip: "Очистить кэш карты"
    },
    lighting: {
        title: "Освещение",
        dayNightSwitch: {
            tooltip: "День/Ночь"
        },
        sunlight: "Солнечный свет",
        ambientLight: "Свет от блоков"
    },
    resolution: {
        title: "Разрешение",
        high: "Высокое (SSAA, x2)",
        normal: "Нормальное (Нативное, x1)",
        low: "Низкое (Апскейл, x0.5)"
    },
    freeFlightControls: {
        title: "Управление свободным полётом",
        mouseSensitivity: "Чувствительность мыши",
        invertMouseY: "Инвертировать мышь по Y"
    },
    renderDistance: {
        title: "Дальность прорисовки",
        hiresLayer: "Высокой чёткости",
        lowersLayer: "Низкой чёткости"
    },
    theme: {
        title: "Тема",
        default: "По умолчанию (Системная/Браузера)",
        dark: "Тёмная",
        light: "Светлая"
    },
    debug: {
        button: "Отладка"
    },
    resetAllSettings: {
        button: "Сбросить все настройки"
    },
    players: {
        title: "Игроки",
        tooltip: "Список игроков"
    },
    compass: {
        tooltip: "Компас / Указать на север"
    },
    controls: {
        title: "Вид / Управление",
        perspective: {
            button: "Перспективная проекция",
            tooltip: "3D / Перспективная проекция"
        },
        flatView: {
            button: "Ортографическая проекция",
            tooltip: "Плоская / Ортографическая проекция",
        },
        freeFlight: {
            button: "Свободный полёт",
            tooltip: "Свободный полёт / Режим наблюдателя"
        }
    },
    language: {
        title: "Язык",
    },
    blockTooltip: {
        block: "Блок",
        position: "Координаты",
        chunk: "Чанк",
        region: {
            region: "Регион",
            file: "Файл"
        },
        light: {
            light: "Освещение",
            sun: "Неба",
            block: "Блоками",
        }
    },
    info: {
        title: "Информация",
        button: "Информация",
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
	Эта карта сгенерирована с &#9829; <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
}