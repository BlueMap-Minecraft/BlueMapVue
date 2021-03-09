<template>
  <div>
    <Group title="View / Controls">
      <SimpleButton :active="appState.controls.state === 'perspective'" @action="$bluemap.setPerspectiveView()">Perspective</SimpleButton>
      <SimpleButton :active="appState.controls.state === 'flat'" @action="$bluemap.setFlatView()">Flat</SimpleButton>
      <SimpleButton :active="appState.controls.state === 'free'" @action="$bluemap.setFreeFlight()">Free-Flight</SimpleButton>
    </Group>

    <Group title="Lighting">
      <Slider :value="mapViewer.uniforms.sunlightStrength.value" :min="0" :max="1" :step="0.01"
              @update="mapViewer.uniforms.sunlightStrength.value = $event">Sunlight</Slider>
      <Slider :value="mapViewer.uniforms.ambientLight.value" :min="0" :max="1" :step="0.01"
              @update="mapViewer.uniforms.ambientLight.value = $event">Ambient-Light</Slider>
    </Group>

    <Group title="Resolution">
      <SimpleButton v-for="stage of qualityStages" :key="stage.name"
                    :active="mapViewer.superSampling === stage.value"
                    @action="$bluemap.mapViewer.superSampling = stage.value; $bluemap.saveUserSettings();"
      >{{stage.name}}</SimpleButton>
    </Group>

    <Group title="Render-Distance">
      <Slider :value="mapViewer.loadedHiresViewDistance" :min="50" :max="500" :step="10"
              @update="mapViewer.loadedHiresViewDistance = $event; $bluemap.mapViewer.updateLoadedMapArea()" @lazy="$bluemap.saveUserSettings()">Hires layer</Slider>
      <Slider :value="mapViewer.loadedLowresViewDistance" :min="500" :max="7000" :step="100"
              @update="mapViewer.loadedLowresViewDistance = $event; $bluemap.mapViewer.updateLoadedMapArea()" @lazy="$bluemap.saveUserSettings()">Lowres layer</Slider>
    </Group>

    <Group title="Free-Flight Controls">
      <Slider :value="appState.controls.mouseSensitivity" :min="0.1" :max="5" :step="0.05"
              @update="appState.controls.mouseSensitivity = $event; $bluemap.updateControlsSettings();" @lazy="$bluemap.saveUserSettings()">Mouse-Sensitivity</Slider>
      <SwitchButton :on="appState.controls.invertMouse" @action="appState.controls.invertMouse = !appState.controls.invertMouse; $bluemap.updateControlsSettings(); $bluemap.saveUserSettings()">Invert Mouse Y</SwitchButton>
    </Group>

    <Group title="Theme">
      <SimpleButton v-for="theme of themes" :key="theme.name"
                    :active="appState.theme === theme.value"
                    @action="$bluemap.setTheme(theme.value); $bluemap.saveUserSettings();"
      >{{theme.name}}</SimpleButton>
    </Group>

    <SwitchButton :on="appState.debug" @action="switchDebug(); $bluemap.saveUserSettings();">Debug</SwitchButton>

    <SimpleButton @action="$bluemap.resetSettings()">Reset All Settings</SimpleButton>
  </div>
</template>

<script>
import Group from "@/components/Menu/Group";
import SimpleButton from "@/components/Menu/SimpleButton";
import Slider from "@/components/Menu/Slider";
import SwitchButton from "@/components/Menu/SwitchButton";

const themes = [
  {name: "Default (System/Browser)", value: null},
  {name: "Dark", value: 'dark'},
  {name: "Light", value: 'light'},
];

const qualityStages = [
  {name: "High (SSAA, x2)", value: 2},
  {name: "Normal (Native, x1)", value: 1},
  {name: "Low (Upscaling, x0.5)", value: 0.5},
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