<template>
  <fat-button color="#ee867b" :opacify="false" @click.native="toggleInventory()" :indicator="highlightedItemsVirtualIds.length">
    <div class="hoverable-button" slot="body">
      <div class="state" ref="button"></div>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../FatButton.vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'elements-buttons-fat-nav-inventory',
  components: {
    FatButton
  },
  computed: {
    ...mapState('inventory', ['highlightedItemsVirtualIds'])
  },
  methods: {
    toggleInventory() {
      this.$store.commit('inventory/toggleInventory');
    },
  }
});
</script>

<style lang="scss" scoped>
.state {
  height: 61px;
  width: 51px;
  margin-top: -12px;
  margin-left: 4px;
  background-image: url('~/app/game-interface/softy/assets/images/navbar/inventory.sprite.png');
  background-repeat: no-repeat;
  animation: close steps(4) 140ms forwards;

  &:hover {
    animation: open steps(4) 140ms forwards;
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
