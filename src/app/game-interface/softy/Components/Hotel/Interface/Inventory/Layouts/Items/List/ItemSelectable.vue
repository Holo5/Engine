<template>
  <div :class="['item-selectable', { selected }, { tradeEnabled }, { disabled }, { highlighted }]" @mousedown="click" @mouseup="blur" @mousemove="drag" @dblclick="select">
    <img :src="inventoryItem.iconUrl"/>
    <span class="item-quantity" v-if="inventoryItem.quantity > 1">{{ inventoryItem.quantity }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {InventoryItem} from '../../../../../../../../../core/logic/inventory/InventoryItem';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'inventory-item-selectable',
  props: {
    inventoryItem: {
      type: InventoryItem,
      required: true,
    }
  },
  data: () => ({
    clicked: false,
  }),
  computed: {
    ...mapState('inventory', ['currentItem', 'highlightedItemsVirtualIds']),
    ...mapState('trade', ['tradeEnabled', 'topButtonState']),
    selected() {
      if (this.currentItem !== null) {
        return this.currentItem.spriteId === this.inventoryItem.spriteId && this.topButtonState === 'inventory';
      }

      return false;
    },
    disabled() {
      return this.inventoryItem.quantity <= 0;
    },
    highlighted() {
      if (this.highlightedItemsVirtualIds.length > 0) {
        if (this.inventoryItem.inventoryItems !== undefined && this.inventoryItem.inventoryItems.length > 0) {
          return this.inventoryItem.inventoryItems.find((item: InventoryItem) => this.highlightedItemsVirtualIds.includes(item.virtualId));
        }

        return this.highlightedItemsVirtualIds.includes(this.inventoryItem.virtualId);
      }

      return false;
    }
  },
  methods: {
    click() {
      this.clicked = true;

      this.$store.commit('trade/setTopButtonState', 'inventory');
      this.$store.dispatch('inventory/selectItem', this.inventoryItem);

      if (this.tradeEnabled) {
        this.$store.commit('trade/setCurrentItem', this.inventoryItem);
        this.$store.commit('trade/setCurrentItemSize', 1);
      }
    },
    blur() {
      if (!this.tradeEnabled) {
        this.clicked = false;
      }
    },
    drag() {
      if (!this.tradeEnabled && this.clicked) {
        this.clicked = false;

        this.select();
      }
    },
    select() {
      if (!this.tradeEnabled) {
        this.$store.dispatch('bridge/startPlacingFurni', this.inventoryItem);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.item-selectable {
  border: 2px solid rgba(102, 102, 102, 0.2);
  width: 43px;
  height: 40px;
  margin: 0 5px 5px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: $medium-border-radius;
  cursor: pointer;
  background-color: transparent;
  transition: 150ms ease-in-out all;

  &.disabled {
    opacity: 0.2;
    cursor: auto;
  }

  img {
    pointer-events: none;
  }

  &:not(.disabled) {
    &:hover,
    &.selected {
      background-color: rgba(102, 102, 102, 0.3);
    }
  }

  &:not(.tradeEnabled) {
    &:nth-child(8n+8) {
      margin-right: 0;
    }

    &:nth-last-child(-n+8) {
      margin-bottom: 0;
    }
  }

  &.highlighted {
    background-color: rgba($green, 0.3);
  }

  &.tradeEnabled {
    width: 45px;
    height: 43px;

    &:nth-child(11n+11) {
      margin-right: 0;
    }

    &:nth-last-child(-n+11) {
      margin-bottom: 0;
    }
  }

  .item-quantity {
    position: absolute;
    left: -2px;
    top: -2px;
    color: $white;
    line-height: 16px;
    border-radius: 12px;
    background-color: $salmon;
    font-size: 12px;
    padding: 0 5px;
    font-weight: bold;
  }
}
</style>
