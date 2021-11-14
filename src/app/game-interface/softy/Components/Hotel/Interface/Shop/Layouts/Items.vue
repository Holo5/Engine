<template>
  <div class="hotel-shop-page">

    <div class="top">
      <item-pres-goto type="prev" @click.native="prevItem"></item-pres-goto>
      <item-pres-item></item-pres-item>
      <item-pres-goto type="next" @click.native="nextItem"></item-pres-goto>
    </div>

    <items-list ref="itemsBloc" :itemsPerLine="7"></items-list>

    <div class="buttons" :class="{ disabled: actualItemIndex <= -1, giftDisabled }">
      <fat-icon-button class="gift-button" color="#f2b701" text="Offrir" @click.native="giftMe"></fat-icon-button>
      <div class="quantity">
        <small-icon-button icon="minus" @click.native="removeItem" type="square"></small-icon-button>
        <input type="number" max="100" min="1" step="1" v-model="actualCatalogItemQuantity">
        <small-icon-button icon="plus" @click.native="addItem" type="square"></small-icon-button>
      </div>
      <fat-icon-button icon="duck" text="Acheter" @click.native="buy"></fat-icon-button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemPresGoto from '../Modules/ItemPres/Goto.vue';
import ItemPresItem from '../Modules/ItemPres/Item.vue';
import ItemsList from '../Modules/List/ItemsList.vue';
import FatIconButton from '../../Elements/Buttons/Fat/IconButton.vue';
import SmallIconButton from '../../Elements/Buttons/Small/IconButton.vue';
import {mapGetters, mapState} from "vuex";

export default Vue.extend({
  name: 'shop-layout-items',
  components: {
    ItemPresGoto,
    ItemPresItem,
    ItemsList,
    FatIconButton,
    SmallIconButton
  },
  computed: {
    ...mapState('catalog', ['actualItemIndex', 'actualCatalogItemQuantity', 'changeEvent', 'actualPage']),
    ...mapGetters('catalog', ['actualItem']),
    items() {
      return this.actualPage.catalogItems;
    },
    giftDisabled() {
      if (!this.actualItem) {
        return false;
      }

      return !this.actualItem.canGift;
    }
  },
  methods: {
    removeItem(): void {
      this.$store.commit('catalog/decreaseActualCatalogItemQuantity');
    },
    addItem(): void {
      this.$store.commit('catalog/increaseActualCatalogItemQuantity');
    },
    prevItem(): void {
      this.$store.commit('catalog/setChangeEvent', 'not-clicked');

      if (this.actualItemIndex - 1 < -1) {
        this.$store.commit('catalog/setActualItemIndex', this.items.length - 1);
      } else {
        this.$store.commit('catalog/setActualItemIndex', this.actualItemIndex - 1);
      }
    },
    nextItem(): void {
      this.$store.commit('catalog/setChangeEvent', 'not-clicked');

      if (this.actualItemIndex + 1 <= this.items.length - 1) {
        this.$store.commit('catalog/setActualItemIndex', this.actualItemIndex + 1);
      } else {
        this.$store.commit('catalog/setActualItemIndex', -1);
      }
    },
    buy(): void {
      this.$store.commit('catalog/displayBuyConfirmation', true);
    },
    giftMe(): void {
      this.$store.dispatch('catalog/getGiftConfiguration');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-shop-page {
  display: flex;
  flex-direction: column;
  width: 100%;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -15px;
    width: calc(100% + 30px);
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0 0 15px;
    opacity: 1;
    transition: 200ms ease-in-out opacity, 200ms ease-in-out filter;
    filter: grayscale(0);

    .quantity {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      background-color: #fff;
      border-radius: $medium-border-radius;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
      padding: 0 10px;
      margin: 0 15px;

      input {
        width: 39px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        padding: 10px 0 9px 0;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }

      .button {
        margin: 8.5px 0;
      }
    }

    &.disabled {
      opacity: 0.5;
      filter: grayscale(100%);

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 999;
      }

      &::v-deep .button::after {
        animation: none;
      }
    }

    &.giftDisabled {
      &::v-deep .gift-button {
        opacity: 0.5;
        filter: grayscale(100%);
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 125px;
        bottom: 0;
        top: 0;
        z-index: 999;
      }
    }
  }
}
</style>
