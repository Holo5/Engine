<template>
  <fat-button :color="'#65af64'" :opacify="false" @click.native="toggleNavigator()">
    <div class="hoverable-button" slot="body">
      <div class="state" ref="button"></div>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../FatButton.vue';

export default Vue.extend({
  name: 'elements-buttons-fat-nav-navigator',
  components: {
    FatButton
  },
  methods: {
    toggleNavigator() {
      this.$store.commit('navigator/toggleNavigator');
    }
  }
});
</script>

<style lang="scss" scoped>
.state {
  height: 61px;
  width: 51px;
  margin-top: -13px;
  margin-left: 4px;
  background-image: url('~/app/game-interface/softy/assets/images/navbar/navigator.sprite.png');
  background-repeat: no-repeat;
  animation: close steps(3) 80ms forwards;

  &:hover {
    animation: open steps(3) 80ms forwards;
  }
}

@keyframes open {
  to {
    background-position: right 0;
  }
}

@keyframes close {
  from {
    background-position: right 0;
  }

  to {
    background-position: left 0;
  }
}
</style>
