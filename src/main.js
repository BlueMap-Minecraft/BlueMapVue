import Vue from 'vue'
import App from './App.vue'
import {BlueMapApp} from "@/js/BlueMapApp";

// utils
String.prototype.includesCI = function (val) {
  return this.toLowerCase().includes(val.toLowerCase());
}

// bluemap app
const bluemap = new BlueMapApp(document.getElementById("map-container"));

// init vue
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$bluemap', {
  get () { return bluemap }
});

let vue = new Vue({
  render: h => h(App)
}).$mount('#app');

// make bluemap accessible in console
window.bluemap = bluemap;

// load bluemap next tick (to let the assets load first)
vue.$nextTick(() => {
  bluemap.load().catch(error => console.error(error));
});