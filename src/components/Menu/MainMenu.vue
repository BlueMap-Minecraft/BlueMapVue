<template>
  <SideMenu :open="menu.isOpen"
            :title="menu.currentPage().title"
            :back="menu.pageStack.length > 1"
            @back="menu.closePage()"
            @close="menu.closeAll()">

    <div v-if="menu.currentPage().id === 'root'">
      <SimpleButton @action="menu.openPage('maps', $t('maps.title'))" :submenu="true">{{ $t("maps.title") }}</SimpleButton>
      <SimpleButton @action="menu.openPage('markers', $t('markers.title'), {markerSet: markers})" :submenu="true">{{ $t("markers.title") }}</SimpleButton>
      <SimpleButton @action="menu.openPage('settings', $t('settings.title'))" :submenu="true">{{ $t("settings.title") }}</SimpleButton>
      <hr>
      <SimpleButton @action="goFullscreen">{{ $t("goFullscreen.title") }}</SimpleButton>
      <SimpleButton @action="$bluemap.resetCamera()">{{ $t("resetCamera.title") }}</SimpleButton>
      <SimpleButton @action="$bluemap.updateMap()" :title="$t('updateMap.description')">{{ $t("updateMap.title") }}</SimpleButton>
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