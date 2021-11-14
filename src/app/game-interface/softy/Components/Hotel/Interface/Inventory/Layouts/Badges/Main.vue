<template>
  <div :class="['badges-layout', { disabled }]" v-if="currentLayout === 'badges'">
    <layout-empty v-if="disabled"></layout-empty>
    <badges-slot></badges-slot>
    <inventory-badges-list></inventory-badges-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import InventoryBadgesList from "./List.vue";
import BadgesSlot from "./Slots.vue";
import LayoutEmpty from "../Empty.vue";

export default Vue.extend({
  name: 'inventory-badges-main',
  computed: {
    ...mapState('inventory', ['currentLayout', 'inventoryBadges']),
    disabled(): boolean {
      return this.inventoryBadges.length <= 0;
    },
  },
  components: {
    LayoutEmpty,
    BadgesSlot,
    InventoryBadgesList,
  },
});
</script>

<style lang="scss" scoped>
.badges-layout {
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.disabled {
    ::v-deep .preview,
    ::v-deep .badges-list {
      opacity: 0.5;
      filter: grayscale(100%);
    }
  }
}
</style>
