<template>
  <div :class="['items-list', { tradeEnabled }]">
    <div class="items">
      <inventory-item-selectable v-for="item in inventoryItems" :inventory-item="item"></inventory-item-selectable>
    </div>
    <div class="buttons" v-if="!tradeEnabled">
      <shop-modules-button @click="buyMore" :icon="'duck'" :text="'Acheter +'" :color="'#ee867b'"></shop-modules-button>
      <shop-modules-button :icon="'item-build'" :text="'Placer'" @click.native="placingSelected"></shop-modules-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters, mapState} from 'vuex';
import InventoryItemSelectable from './List/ItemSelectable.vue';
import ShopModulesButton from '../../../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'inventory-items-list',
  components: {
    ShopModulesButton,
    InventoryItemSelectable,
  },
  computed: {
    ...mapState('inventory', ['inventoryItems', 'currentItem', 'highlightedItemsVirtualIds']),
    ...mapState('trade', ['tradeEnabled']),
  },
  watch: {
    inventoryItems(newItemsList) {
      if (newItemsList.length > 0 && this.currentItem === null) {
        this.$store.dispatch('inventory/selectItem', newItemsList[0]);
      }
    },
  },
  methods: {
    buyMore() {
      // Todo: buy current item
    },
    placingSelected() {
      this.$store.dispatch('bridge/startPlacingFurni', this.currentItem);
    },
  },
});
</script>

<style lang="scss" scoped>
.items-list {
  width: calc(100% - 150px - 15px);

  .items {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 225px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 5px;
    align-content: start;
  }

  &.tradeEnabled {
    width: 100%;
    margin-bottom: 15px;

    .items {
      height: auto;
      max-height: 139px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;

    .button:first-child {
      margin-right: 15px;
    }
  }
}
</style>
