<template>
  <div :class="['trade-main', { disabled }]" v-if="isVisible">
    <div class="body">
      <trade-area-top></trade-area-top>
      <div class="lists">
        <trade-area-list :lock-state="selfLockState" :items="selfItems"></trade-area-list>
        <trade-area-list :user="username" :lock-state="userLockState" :items="userItems"></trade-area-list>
      </div>
    </div>
    <div :class="['buttons', { buttonDisabled }]">
      <small-icon-button class="first" icon="prev" color="#aaa" :text="'Annuler'" @click.native="cancel"></small-icon-button>
      <small-icon-button class="disableable" :align="textAlign" icon="next" color="#ee867b" :text="stepButtonText" @click.native="nextStep"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import ShopModulesButton from "../../../Elements/Buttons/Fat/IconButton.vue";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";
import TradeAreaTop from "./TradeArea/Top.vue";
import TradeAreaList from "./TradeArea/ItemsList.vue";

export default Vue.extend({
  name: 'inventory-trade-main',
  components: {
    TradeAreaList,
    TradeAreaTop,
    SmallIconButton,
    ShopModulesButton,
  },
  computed: {
    ...mapState('trade', ['tradeState', 'tradeEnabled', 'error', 'username', 'selfLockState', 'userLockState', 'selfItems', 'userItems', 'countdown']),
    ...mapState('inventory', ['currentLayout']),
    isVisible(): boolean {
      return this.tradeEnabled && this.currentLayout === 'items';
    },
    disabled() {
      return this.tradeEnabled && this.error;
    },
    stepButtonText() {
      switch (this.tradeState) {
        case 0:
          return 'Valider la proposition';
        case 1:
          return 'Modifier ma proposition';
        case 2:
          return 'Validation en cours... ' + this.countdown;
        case 3:
          return 'Confirmer l\'échange !';
      }
    },
    buttonDisabled() {
      return this.tradeState === 2;
    },
    textAlign() {
      return this.tradeState === 3 ? 'center' : 'left';
    },
  },
  methods: {
    cancel(): void {
      this.$store.dispatch('trade/stopTrading');
    },
    nextStep(): void {
      switch (this.tradeState) {
        case 0:
          this.$store.dispatch('trade/acceptTrade');
          break;
        case 1:
          this.$store.dispatch('trade/editTrade');
          break;
        case 3:
          this.$store.dispatch('trade/confirmTrade');
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";

.trade-main {
  width: calc(100% - 150px - 15px);
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  &.disabled {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .body {
    width: 100%;
    height: 225px;
    background-color: rgba(238, 134, 123, .3);
    border-radius: $medium-border-radius;
    margin-bottom: 15px;
    padding: 11px;

    .lists {
      display: flex;
      flex-direction: row;
      padding: 2px;

      .list {
        width: calc(50% - 15px/2);

        &:first-child {
          margin-right: 15px;
        }
      }
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &.buttonDisabled {
      .disableable {
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: red;
        }
      }
    }

    .first {
      width: 53%;
      margin-right: 15px;
    }
  }
}
</style>