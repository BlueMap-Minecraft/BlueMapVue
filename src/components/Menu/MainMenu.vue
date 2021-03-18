<template>
  <SideMenu :open="menu.isOpen"
            :title="menu.currentPage().title"
            :back="menu.pageStack.length > 1"
            @back="menu.closePage()"
            @close="menu.closeAll()">

    <div v-if="menu.currentPage().id === 'root'">
      <SimpleButton @action="menu.openPage('maps', 'Maps')" :submenu="true">Maps</SimpleButton>
      <SimpleButton @action="menu.openPage('markers', 'Markers', {markerSet: markers})" :submenu="true">Markers</SimpleButton>
      <SimpleButton @action="menu.openPage('settings', 'Settings')" :submenu="true">Settings</SimpleButton>
      <hr>
      <SimpleButton @action="goFullscreen">Go Fullscreen</SimpleButton>
      <SimpleButton @action="$bluemap.resetCamera()">Reset Camera</SimpleButton>
      <SimpleButton @action="$bluemap.updateMap()" title="Clear Tile Cache">Update Map</SimpleButton>
    </div>

    <div v-if="menu.currentPage().id === 'maps'">
      <MapButton v-for="map of appState.maps" :key="map.id" :map="map" />
    </div>

    <MarkerSetMenu v-if="menu.currentPage().id === 'markers'" :menu="menu" />

    <SettingsMenu v-if="menu.currentPage().id === 'settings'" />

  </SideMenu>
</template>

<script>
import SideMenu from "@/components/Menu/SideMenu";
import SimpleButton from "@/components/Menu/SimpleButton";
import SettingsMenu from "@/components/Menu/SettingsMenu";
import {MainMenu} from "@/js/MainMenu";
import MarkerSetMenu from "@/components/Menu/MarkerSetMenu";
import MapButton from "@/components/Menu/MapButton";

export default {
  name: "MainMenu",
  components: {MapButton, MarkerSetMenu, SettingsMenu, SimpleButton, SideMenu},
  props: {
    menu: MainMenu
  },
  data() {
    return {
      appState: this.$bluemap.appState,
      markers: this.$bluemap.mapViewer.markers.data,
    }
  },
  methods: {
    goFullscreen() {
      document.body.requestFullscreen();
    }
  }
}
</script>

<style>

</style>