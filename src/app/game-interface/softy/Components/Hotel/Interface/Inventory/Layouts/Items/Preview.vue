<template>
  <inventory-preview :class="[{ disabled }]">
    <div :class="['item-preview', { disabled }]" slot="preview" v-if="currentItem">
      <div class="item">
        <!-- TODO: rendu du mobi ici -->
      </div>
      <div class="infos">
        <h1>{{ currentItem.furniData.name }}</h1>
        <span>{{ currentItemQuantity }} exemplaire{{ currentItemQuantity > 1 ? 's' : '' }}</span>
      </div>
    </div>
  </inventory-preview>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters, mapState} from "vuex";
import InventoryPreview from "../../Preview.vue";
import {InventoryItem} from "../../../../../../../../core/logic/inventory/InventoryItem";

export default Vue.extend({
  name: 'preview-item',
  components: {
    InventoryPreview,
  },
  computed: {
    ...mapState('inventory', ['currentItem', 'inventoryItems']),
    ...mapState('trade', ['topButtonState']),
    disabled(): boolean {
      return this.topButtonState !== 'inventory';
    },
    currentItemQuantity(): number {
      return this.currentItem !== null ? this.inventoryItems.find((item: InventoryItem) => item.spriteId === this.currentItem.spriteId)?.quantity : 1;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.item-preview {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  .item {
    // TODO: style for render
  }

  .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 10px 10px;

    h1 {
      font-size: 20px;
      color: #fff;
      text-align: center;
    }

    span {
      background-color: #fff;
      color: $black;
      font-size: 13px;
      margin-top: 5px;
      width: 100%;
      text-align: center;
      border-radius: $small-border-radius;
      font-weight: bold;
      padding: 5px;
    }
  }
}
</style>
