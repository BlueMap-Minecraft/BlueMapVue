/*
 * This file is part of BlueMap, licensed under the MIT License (MIT).
 *
 * Copyright (c) Blue (Lukas Rieger) <https://bluecolored.de>
 * Copyright (c) contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import Vue from 'vue'
import App from './App.vue'
import {BlueMapApp} from "@/js/BlueMapApp";
import { initializeApp } from 'firebase/app';
import i18n from './i18n';

// utils
String.prototype.includesCI = function (val) {
  return this.toLowerCase().includes(val.toLowerCase());
}

// bluemap app
const bluemap = new BlueMapApp(document.getElementById("map-container"));
window.bluemap = bluemap;

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEUllvYM4c_DLOgUmykIQgrv1qDg-hQ4Q",
  authDomain: "realtimedisplays-database.firebaseapp.com",
  databaseURL: "https://realtimedisplays-database-default-rtdb.firebaseio.com",
  projectId: "realtimedisplays-database",
  storageBucket: "realtimedisplays-database.appspot.com",
  messagingSenderId: "426154654247",
  appId: "1:426154654247:web:c8cd9b3624fce920da2c02",
  measurementId: "G-7647L62VB3"
});

// init vue
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$bluemap', {
  get() { return bluemap; }
});


const vue = new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app');

// load languages
i18n.loadLanguageSettings().catch(error => console.error(error));

// load bluemap next tick (to let the assets load first)
vue.$nextTick(() => {
  bluemap.load().catch(error => console.error(error));
});
