<template>
  <div id="canvas-zone" @click="focusChatbar"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CanvasZone',
  methods: {
    focusChatbar() {
      this.$root.$emit('focus-chatbar');
    }
  }
});
</script>

<style lang="scss" scoped>
#canvas-zone {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  canvas {
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }
}
</style>
