<template>
  <div>
    <div class="wait-for-state" v-if="waitForState">
      En attente de l'autre utilisateur...
    </div>
    <div :class="['trade-area-top', { disabled }, { waitForState }]">
      <div :class="['qg', { disabled: quantityDisabled }]">
        <quantity-group :defaultValue="quantity" :min="1" :max="max" :step="1" @update="update" model="quantity"></quantity-group>
      </div>
      <small-icon-button align="center" :icon="buttonIcon" color="#ee867b" :text="buttonText" @click.native="click"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SmallIconButton from "../../../../Elements/Buttons/Fat/SmallIconButton.vue";
import QuantityGroup from "../../../../Elements/Inputs/QuantityGroup.vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'trade-area-top',
  components: {
    QuantityGroup,
    SmallIconButton,
  },
  computed: {
    ...mapState('trade', ['currentItem', 'currentItemSize', 'topButtonState', 'tradeState']),
    max() {
      return this.currentItem ? this.currentItem.quantity : 100;
    },
    disabled() {
      return this.currentItem === null || this.currentItem.quantity <= 0 || this.tradeState !== 0;
    },
    quantityDisabled() {
      return this.topButtonState === 'trade';
    },
    buttonText(): string {
      return this.topButtonState === 'inventory' ? 'Proposer à l\'échange' : 'Retirer 1 de l\'échange';
    },
    buttonIcon(): string {
      return this.topButtonState === 'inventory' ? 'plus' : 'minus';
    },
    waitForState(): boolean {
      return this.disabled && this.tradeState === 1;
    },
  },
  data: () => ({
    quantity: 1,
  }),
  watch: {
    quantity(newValue) {
      this.$store.commit('trade/setCurrentItemSize', newValue);
    },
    currentItem() {
      this.quantity = 1;
    },
  },
  methods: {
    update(args: { model: string, value: number }): void {
      this[args.model] = args.value;
    },
    click(): void {
      if (this.topButtonState === 'inventory') {
        this.$store.dispatch('trade/tradeItem');
      } else {
        this.$store.dispatch('trade/untradeItem');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";

.wait-for-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: $grey;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.trade-area-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 150ms ease-in-out all;
  opacity: 1;
  filter: grayscale(0%);

  &.disabled {
    opacity: 0.5;
    filter: grayscale(100%);

    &.waitForState {
      opacity: 0.1;
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 998;
    }
  }

  .qg {
    margin-right: 10px;
    width: 50%;
    transition: 150ms ease-in-out all;
    opacity: 1;
    filter: grayscale(0%);

    &.disabled {
      opacity: 0.5;
      filter: grayscale(100%);

      &::after {
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
      }
    }

    ::v-deep .quantity-group {
      margin-bottom: 0;
      margin-top: 0;

      .quantity {
        height: 38px;
      }
    }
  }
}
</style>
