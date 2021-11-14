<template>
  <div :class="['items-layout', { disabled }, { tradeEnabled }]" v-if="currentLayout === 'items'">
    <layout-empty v-if="disabled"></layout-empty>
    <inventory-items-list></inventory-items-list>
    <div class="tradeBloc">
      <preview-item></preview-item>
      <inventory-trade-main></inventory-trade-main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InventoryItemsList from './List.vue';
import {mapState} from "vuex";
import PreviewItem from "./Preview.vue";
import LayoutEmpty from "../Empty.vue";
import InventoryTradeMain from "../Trade/Main.vue";

export default Vue.extend({
  name: 'inventory-items-main',
  computed: {
    ...mapState('inventory', ['currentLayout', 'inventoryItems']),
    ...mapState('trade', ['tradeEnabled']),
    disabled(): boolean {
      return this.inventoryItems.length <= 0 && !this.tradeEnabled;
    },
  },
  components: {
    InventoryTradeMain,
    LayoutEmpty,
    PreviewItem,
    InventoryItemsList,
  },
});
</script>

<style lang="scss" scoped>
.items-layout {
  padding-top: 15px;

  &:not(.tradeEnabled) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    &.disabled {
      ::v-deep .preview,
      ::v-deep .items-list {
        opacity: 0.5;
        filter: grayscale(100%);
      }
    }
  }

  &.tradeEnabled .tradeBloc {
    display: flex;
    flex-direction: row;
  }
}
</style>
