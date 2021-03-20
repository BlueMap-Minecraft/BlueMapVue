<template>
  <div>
    <Group title="View / Controls">
      <SimpleButton :active="appState.controls.state === 'perspective'" @action="$bluemap.setPerspectiveView(500, appState.controls.state === 'free' ? 100 : 0)">{{$t('controls.perspective.title')}}</SimpleButton>
      <SimpleButton :active="appState.controls.state === 'flat'" @action="$bluemap.setFlatView(500, appState.controls.state === 'free' ? 100 : 0)">{{$t('controls.flatView.title')}}</SimpleButton>
      <SimpleButton :active="appState.controls.state === 'free'" @action="$bluemap.setFreeFlight(500)">{{$t('controls.freeFlight.title')}}</SimpleButton>
    </Group>

    <Group :title="$t('lighting.title')">
      <Slider :value="mapViewer.uniforms.sunlightStrength.value" :min="0" :max="1" :step="0.01"
              @update="mapViewer.uniforms.sunlightStrength.value = $event">Sunlight</Slider>
      <Slider :value="mapViewer.uniforms.ambientLight.value" :min="0" :max="1" :step="0.01"
              @update="mapViewer.uniforms.ambientLight.value = $event">Ambient-Light</Slider>
    </Group>

    <Group :title="$t('resolution.title')">
      <SimpleButton v-for="stage of qualityStages" :key="stage.name"
                    :active="mapViewer.superSampling === stage.value"
                    @action="$bluemap.mapViewer.superSampling = stage.value; $bluemap.saveUserSettings();"
      >{{stage.name}}</SimpleButton>
    </Group>

    <Group :title="$t('renderDistance.title')">
      <Slider :value="mapViewer.loadedHiresViewDistance" :min="50" :max="500" :step="10"
              @update="mapViewer.loadedHiresViewDistance = $event; $bluemap.mapViewer.updateLoadedMapArea()" @lazy="$bluemap.saveUserSettings()">{{ $t("renderDistance.hiresLayer") }}</Slider>
      <Slider :value="mapViewer.loadedLowresViewDistance" :min="500" :max="10000" :step="100"
              @update="mapViewer.loadedLowresViewDistance = $event; $bluemap.mapViewer.updateLoadedMapArea()" @lazy="$bluemap.saveUserSettings()">{{ $t("renderDistance.lowersLayer") }}</Slider>
    </Group>

    <Group :title="$t('freeFlightControls.title')">
      <Slider :value="appState.controls.mouseSensitivity" :min="0.1" :max="5" :step="0.05"
              @update="appState.controls.mouseSensitivity = $event; $bluemap.updateControlsSettings();" @lazy="$bluemap.saveUserSettings()">{{ $t("freeFlightControls.mouseSensitivity") }}</Slider>
      <SwitchButton :on="appState.controls.invertMouse" @action="appState.controls.invertMouse = !appState.controls.invertMouse; $bluemap.updateControlsSettings(); $bluemap.saveUserSettings()">{{ $t("freeFlightControls.invertMouseY") }}</SwitchButton>
    </Group>

    <Group :title="$t('theme.title')">
      <SimpleButton v-for="theme of themes" :key="theme.name"
                    :active="appState.theme === theme.value"
                    @action="$bluemap.setTheme(theme.value); $bluemap.saveUserSettings();"
      >{{theme.name}}</SimpleButton>
    </Group>

    <SwitchButton :on="appState.debug" @action="switchDebug(); $bluemap.saveUserSettings();">{{ $t("debug.title") }}</SwitchButton>

    <SimpleButton @action="$bluemap.resetSettings()">{{ $t("resetAllSettings.title") }}</SimpleButton>
  </div>
</template>

<script>
import Group from "@/components/Menu/Group";
import SimpleButton from "@/components/Menu/SimpleButton";
import Slider from "@/components/Menu/Slider";
import SwitchButton from "@/components/Menu/SwitchButton";
import i18n from "../../i18n";

const themes = [
  {name: i18n.t("theme.default"), value: null},
  {name: i18n.t("theme.dark"), value: 'dark'},
  {name: i18n.t("theme.light"), value: 'light'},
];

const qualityStages = [
  {name: i18n.t("resolution.high"), value: 2},
  {name: i18n.t("resolution.normal"), value: 1},
  {name: i18n.t("resolution.low"), value: 0.5},
];

export default {
name: "SettingsMenu",
  components: {SwitchButton, Slider, SimpleButton, Group},
  data() {
    return {
      appState: this.$bluemap.appState,
      mapViewer: this.$bluemap.mapViewer.data,

      qualityStages: qualityStages,
      themes: themes,
    }
  },
  methods: {
    switchDebug() {
      this.$bluemap.setDebug(!this.appState.debug);
    }
  }
}
</script>

<style>

</style>