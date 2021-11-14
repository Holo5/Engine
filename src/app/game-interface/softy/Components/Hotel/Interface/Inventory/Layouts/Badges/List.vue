<template>
  <div class="badges-list">
    <div class="badges">
      <inventory-badge-selectable v-for="badge in badgesNotSlotted" :inventory-badge="badge"></inventory-badge-selectable>
    </div>
    <div :class="['buttons', { disabled }]">
      <shop-modules-button @click.native="slot" :icon="'duck'" :text="'Porter ce badge (' + slotAvailables + ')'" :color="'#ee867b'"></shop-modules-button>
      <!-- @todo change icon -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters, mapState} from "vuex";
import InventoryBadgeSelectable from "./List/BadgeSelectable.vue";
import ShopModulesButton from '../../../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'inventory-badges-list',
  components: {
    InventoryBadgeSelectable,
    ShopModulesButton,
  },
  computed: {
    ...mapState('inventory', ['inventoryBadges']),
    ...mapGetters('inventory', ['badgeSelected', 'badgesSlotted', 'badgesNotSlotted']),
    slotAvailables(): string {
      const slots: number = 5 - this.badgesSlotted.length;
      const s: string = slots > 1 ? 's' : '';

      return `${slots} place${s} restante${s}`;
    },
    disabled(): boolean {
      return this.badgesSlotted.length >= 5 || (typeof this.badgeSelected === 'undefined' || this.badgeSelected?.slot > 0);
    },
  },
  methods: {
    slot() {
      this.$store.dispatch('inventory/slotBadges');
    },
  },
});
</script>

<style lang="scss">
.badges-list {
  width: calc(100% - 150px - 15px);

  .badges {
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

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;

    &.disabled {
      opacity: 0.5;
      filter: grayscale(100%);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 999;
      }
    }
  }
}
</style>