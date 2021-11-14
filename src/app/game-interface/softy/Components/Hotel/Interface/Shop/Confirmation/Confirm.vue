<template>
  <elements-draggable-box :is-draggable="false" class="shop-buy-confirmation" v-if="buyConfirmationDisplayed">
    <span slot="title">Confirmation d'achat</span>
    <div class="content" slot="body">
      <div class="top">
        <div class="left">
          <!-- item render -->
        </div>
        <div class="right">
          <span class="item-name">{{ actualItem.itemDataName }} (x{{ actualCatalogItemQuantity }})</span>
          <div class="price" v-tooltip.bottom="'Prix unitaire: ' + price">
            <div class="icon" :class="priceType"></div>
            <span>{{ price * actualCatalogItemQuantity}}</span>
          </div>
        </div>
      </div>
      <div class="down">
        <small-icon-button class="first" icon="prev" color="#aaa" text="Annuler" @click.native="closeBox"></small-icon-button>
        <fat-icon-button icon="duck" text="Acheter" @click.native="buy"></fat-icon-button>
      </div>
    </div>
  </elements-draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsDraggableBox from "../../Elements/Box/DraggableBox.vue";
import {mapGetters, mapState} from "vuex";
import FatIconButton from '../../Elements/Buttons/Fat/IconButton.vue';
import SmallIconButton from "../../Elements/Buttons/Fat/SmallIconButton.vue";
export default Vue.extend({
  name: 'shop-confirm-buy',
  components: {
    ElementsDraggableBox,
    SmallIconButton,
    FatIconButton
  },
  computed: {
    ...mapState('catalog', ['buyConfirmationDisplayed', 'actualCatalogItemQuantity']),
    ...mapGetters('catalog', ['actualItem']),
    priceType() {
      if (this.actualItem.credits) {
        return 'credit';
      } else if (this.actualItem.seasonal) {
        return 'seasonal';
      }
      return 'diamond';
    },
    price() {
      if (this.actualItem.credits) {
        return this.actualItem.creditCost;
      } else if (this.actualItem.seasonal) {
        return this.actualItem.seasonalCost;
      }
      return this.actualItem.diamondCost;
    },
  },
  methods: {
    closeBox() {
      this.$store.commit('catalog/displayBuyConfirmation', false);
    },
    buy() {
      this.$store.dispatch('catalog/buyItem');
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";
.shop-buy-confirmation {
  width: 330px;
  left: calc(50% - 330px/2);
  position: absolute;
  z-index: 999;
  top: calc(50% - 200px/2);
  .content {
    padding: 0 15px 15px 15px;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      flex-direction: row;
      .left {
        width: 100px;
        height: 100px;
        background-color: $white;
        border-radius: $medium-border-radius;
        box-shadow: 0 0 10px rgba($black, 0.1);
      }
      .right {
        width: calc(100% - 100px - 15px);
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        span.item-name {
          font-weight: 600;
          font-size: 18px;
          width: 100%;
          word-wrap: break-word;
        }
        .price {
          background-color: $white;
          border-radius: $small-border-radius;
          box-shadow: 0 0 10px rgba($black, 0.1);
          margin-top: 5px;
          padding: 4px 8px 3px 5px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          .icon {
            margin-right: 4px;
            &.diamond {
              @include itf-icon(15px, 15px, 0, 0);
            }
            &.credit {
              @include itf-icon(15px, 15px, -16px, 0);
            }
            &.seasonal {
              @include itf-icon(15px, 15px, -32px, 0);
            }
          }
          span {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
    .down {
      display: flex;
      flex-direction: row;
      margin-top: 15px;
      .small-icon-button {
        margin-right: 15px;
      }
    }
  }
}
</style>
