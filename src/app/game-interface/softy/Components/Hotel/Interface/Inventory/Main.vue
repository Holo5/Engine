<template>
  <draggable-box class="hotel-box-inventory" v-show="inventoryDisplayed">
    <span slot="title">Inventaire</span>
    <div slot="body" class="box-body-content">
      <search-bar></search-bar>
      <navigation></navigation>
      <div class="content">
        <inventory-items-main></inventory-items-main>
        <inventory-badges-main></inventory-badges-main>
        <inventory-under-construction v-if="currentLayout === 'pets' || currentLayout === 'bots'"></inventory-under-construction>
        <inventory-trade-in-progress></inventory-trade-in-progress>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import DraggableBox from '../Elements/Box/DraggableBox.vue';
import SearchBar from './SearchBar.vue';
import Navigation from './Navigation.vue';
import Preview from './Preview.vue';
import InventoryItemsMain from './Layouts/Items/Main.vue';
import { mapState } from "vuex";
import InventoryBadgesMain from "./Layouts/Badges/Main.vue";
import InventoryTradeInProgress from "./Layouts/Trade/InProgress.vue";
import InventoryUnderConstruction from "./Layouts/UnderConstruction.vue";

export default Vue.extend({
  name: 'inventory-main',
  components: {
    InventoryUnderConstruction,
    InventoryTradeInProgress,
    InventoryBadgesMain,
    InventoryItemsMain,
    DraggableBox,
    SearchBar,
    Navigation,
    Preview,
  },
  computed: {
    ...mapState('inventory', ['inventoryDisplayed', 'currentLayout']),
  },
  methods: {
    closeBox(): void {
      this.$store.commit('inventory/toggleInventory');
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-inventory {
  width: 590px;
  top: 70px;
  left: 120px;

  .box-body-content {
    padding: 0 15px 15px 15px;
  }
}
</style>
