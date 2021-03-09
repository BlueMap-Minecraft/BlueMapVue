<template>
  <div class="marker-item" :class="{'marker-hidden': !marker.visible}" :title="marker.id" @click="click">
    <div class="icon" v-if="marker.type === 'player'">
      <img :src="'assets/playerheads/' + marker.playerUuid + '.png'" alt="playerhead" @error="steve">
    </div>
    <div class="info">
      <div class="label">{{markerLabel}}</div>
      <div class="stats">
        <div>
          {{marker.type}}-marker
        </div>
        <div>
          ({{marker.position.x | position}} | {{marker.position.y | position}} | {{marker.position.z | position}})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkerItem",
  props: {
    marker: Object
  },
  computed: {
    markerLabel() {
      switch (this.marker.type) {
        case "player" : return this.marker.name;
        default : break;
      }

      if (this.marker.label){
        let strippedLabel = /^(?:<[^>]*>\s*)*([^<>]*\S[^<>]*)(?:<|$)/gi.exec(this.marker.label);
        if (strippedLabel && strippedLabel.length > 1) {
          return strippedLabel[1];
        }
      }

      return this.marker.id;
    }
  },
  filters: {
    position(v) {
      return Math.floor(v);
    }
  },
  methods: {
    click() {
      if (!this.marker.visible) return;
      this.$bluemap.mapViewer.controlsManager.position.copy(this.marker.position);
    },
    steve(event) {
      event.target.src = "assets/steve.png";
    }
  }
}
</script>

<style lang="scss">
@import "~@/scss/variables.scss";

.side-menu .marker-item {
  display: flex;

  margin: 0.5em 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  white-space: nowrap;
  user-select: none;

  &:hover {
    background-color: var(--theme-bg-light);
  }

  &.marker-hidden {
    opacity: 0.5;
    filter: grayscale(1);
  }

  .info {
    position: relative;
    flex-grow: 1;
    overflow-x: hidden;
    text-overflow: ellipsis;

    .label {
      line-height: 2em;
      overflow-x: hidden;
      text-overflow: ellipsis;
      margin: 0 0.5em 1.5em 0.5em;
    }

    .stats {
      display: flex;
      margin: 0 0.5em;

      position: absolute;
      bottom: 0;

      font-size: 0.8em;
      line-height: 2em;
      color: var(--theme-fg-light);

      > div {
        &:not(:first-child) {
          margin-left: 0.5em;
          padding-left: 0.5em;
          border-left: solid 1px var(--theme-bg-light);
        }
      }
    }
  }

  .icon {
    height: 2.5em;
    margin: 0.5em;
    flex-shrink: 0;

    img {
      image-rendering: pixelated;
      height: 100%;
    }
  }
}
</style>