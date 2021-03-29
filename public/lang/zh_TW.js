export default {
    pageTitle: "BlueMap - {map}",
    menu: {
        title: "選單",
        tooltip: "選單"
    },
    maps: {
        title: "地圖",
        button: "地圖",
        tooltip: "地圖列表"
    },
    markers: {
        title: "圖釘",
        button: "圖釘",
        tooltip: "圖釘列表",
        marker: "圖釘 | 圖釘",
        markerSet: "圖釘設定 | 圖釘設定"
    },
    settings: {
        title: "設定",
        button: "設定"
    },
    goFullscreen: {
        button: "全螢幕模式"
    },
    resetCamera: {
        button: "重置視角",
        tooltip: "重置視角 & 位置"
    },
    updateMap: {
        button: "更新地圖",
        tooltip: "清除暫存"
    },
    lighting: {
        title: "亮度",
        dayNightSwitch: {
            tooltip: "白天/夜晚"
        },
        sunlight: "時間",
        ambientLight: "環境光"
    },
    resolution: {
        title: "解析度",
        high: "高 (最高畫質,SSAA, x2)",
        normal: "預設 (畫質優先,Native, x1)",
        low: "低 (效能優先,Upscaling, x0.5)"
    },
    freeFlightControls: {
        title: "滑鼠設定",
        mouseSensitivity: "滑鼠靈敏度",
        invertMouseY: "反轉Y軸"
    },
    renderDistance: {
        title: "顯示範圍",
        hiresLayer: "高畫質的距離",
        lowersLayer: "低畫質的距離"
    },
    theme: {
        title: "主題",
        default: "預設 (系統/瀏覽器)",
        dark: "黑暗",
        light: "明亮"
    },
    debug: {
        button: "除錯"
    },
    resetAllSettings: {
        button: "重設所有設定"
    },
    players: {
        title: "玩家",
        tooltip: "玩家列表"
    },
    compass: {
        tooltip: "指北針"
    },
    controls: {
        title: "顯示/控制",
        perspective: {
            button: "立體",
            tooltip: "立體顯示"
        },
        flatView: {
            button: "平面",
            tooltip: "正射/平面顯示",
        },
        freeFlight: {
            button: "觀察者",
            tooltip: "觀察者模式"
        }
    },
    language: {
        title: "語言",
    },
    blockTooltip: {
        block: "方塊",
        position: "座標",
        chunk: "區塊",
        region: {
            region: "區域",
            file: "檔案"
        },
        light: {
            light: "亮度",
            sun: "日光",
            block: "光源",
        }
    },
    info: {
        title: "資訊",
        button: "資訊",
        content: `
<img src="assets/logo.png" style="display: block; width: 40%; margin: 3em auto; border-radius: 50%">
<p>
	<h2>滑鼠控制:</h2>
	<table>
		<tr><th>移動:</th><td><kbd>左鍵</kbd>長按</td></tr>
		<tr><th>縮放:</th><td><kbd>滑鼠滾輪</kbd> (測試)</td></tr>
		<tr><th>旋轉/傾斜:</th><td><kbd>右鍵</kbd>長按</td></tr>
	</table>
</p>
<p>
	<h2>鍵盤控制:</h2>
	<table>
		<tr><th>移動:</th><td><kbd>點擊</kbd> / <kbd>方向鍵</kbd></td></tr>
		<tr><th>縮放:</th><td>Numpad: <kbd>+</kbd>/<kbd>-</kbd> or <kbd>Ins</kbd>/<kbd>Home</kbd></td></tr>
		<tr><th>旋轉/傾斜:</th><td><kbd>左Alt</kbd> + <kbd>點擊</kbd> / <kbd>方向鍵</kbd> 或 <kbd>Delete</kbd>/<kbd>End</kbd>/<kbd>Page Up</kbd>/<kbd>Page Down</kbd></td></tr>
	</table>
</p>
<p>
	<h2>觸控:</h2>
	<table>
		<tr><th>移動:</th><td>拖動</td></tr>
		<tr><th>縮放:</th><td>用兩根手指觸摸</td></tr>
		<tr><th>旋轉/傾斜:</th><td>用兩根手指觸摸旋轉</td></tr>
	</table>
</p>
<br><hr>
<p>
	This map has been generated with &#9829; using <a href="https://bluecolo.red/bluemap">BlueMap</a>.
</p>
		`
    }
}