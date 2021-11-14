<template>
  <transition name="fade">
    <div id="loading-screen">
      <div class="logo"></div>
      <p class="text">{{ loadingProgress }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'base-loading',
  computed: {
    ...mapState('loadingOverlay', ['loadingProgress']),
  },
});
</script>

<style lang="scss">
#loading-screen {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 90000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 235px;
    height: 286px;
    background-image: url('~/app/game-interface/softy/assets/images/holo-logo.png');
    background-repeat: no-repeat;
  }

  p {
    color: white;
  }
}
</style>
