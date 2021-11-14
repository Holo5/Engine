<template>
  <fat-button :color="'#eeb80e'" :opacify="false" @click.native="toggleShop()">
    <div class="hoverable-button" slot="body">
      <div class="state" ref="button"></div>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../FatButton.vue';

export default Vue.extend({
  name: 'elements-buttons-fat-nav-shop',
  components: {
    FatButton
  },
  methods: {
    toggleShop() {
      this.$store.commit('catalog/toggleCatalog');
    }
  }
});
</script>

<style lang="scss" scoped>
.state {
  height: 61px;
  width: 51px;
  margin-top: -12px;
  margin-left: 4px;
  background-image: url('~/app/game-interface/softy/assets/images/navbar/shop.sprite.png');
  background-repeat: no-repeat;
  animation: close steps(5) 170ms forwards;

  &:hover {
    animation: open steps(5) 170ms forwards;
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
