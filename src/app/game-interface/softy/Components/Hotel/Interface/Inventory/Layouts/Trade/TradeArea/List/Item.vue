<template>
  <div :class="['item-selectable', { selected }, { clickable }]" v-tooltip="itemName" @click="selectItem">
    <img :src="item.iconUrl" :alt="itemName"/>
    <span class="quantity">{{ item.quantity }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { InventoryItemTrade } from '../../../../../../../../../../core/logic/inventory/InventoryItemTrade';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'trade-area-item',
  computed: {
    ...mapState('trade', ['currentItem', 'topButtonState', 'selfItems']),
    itemName(): string {
      return this.item.furniData ? this.item.furniData.name : '';
    },
    selected(): boolean {
      return this.currentItem !== null && this.currentItem.spriteId === this.item.spriteId && this.topButtonState === 'trade';
    },
  },
  props: {
    item: InventoryItemTrade,
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    selfItems() {
      if (this.topButtonState === 'trade' && this.currentItem.spriteId === this.item.spriteId) {
        this.selectItem();
      }
    },
  },
  methods: {
    selectItem() {
      if (this.clickable) {
        this.$store.dispatch('trade/selectTradeItem', this.item);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../../assets/sass/colors";
@import "../../../../../../../../assets/sass/variables";

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

  &.clickable {
    cursor: pointer;
  }

  &.selected {
    background-color: rgba(102, 102, 102, 0.3);
  }

  img {
    pointer-events: none;
  }

  &:nth-child(3n+3) {
    margin-right: 0;
  }

  .quantity {
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
