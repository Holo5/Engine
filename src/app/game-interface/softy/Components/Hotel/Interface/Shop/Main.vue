<template>
  <draggable-box class="hotel-box-shop" v-show="catalogDisplayed">
    <span slot="title">Catalogue</span>
    <div slot="body" :class="['content', { 'popup-overlay': buyConfirmationDisplayed || sendGiftDisplayed }]">

      <shop-confirm-buy></shop-confirm-buy>
      <shop-gift-main></shop-gift-main>
      <search-bar :class="{ opacify: buyConfirmationDisplayed || sendGiftDisplayed }"></search-bar>
      <navigation :class="{ opacify: buyConfirmationDisplayed || sendGiftDisplayed }"></navigation>
      <shop-body :class="{ opacify: buyConfirmationDisplayed || sendGiftDisplayed }"></shop-body>

    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import DraggableBox from '../Elements/Box/DraggableBox.vue';
import SearchBar from './SearchBar.vue';
import Navigation from './Navigation.vue';
import ShopBody from './Body.vue';
import ShopConfirmBuy from './Confirmation/Confirm.vue';
import {mapState} from "vuex";
import ShopGiftMain from "./Gift/Main.vue";

export default Vue.extend({
  name: 'shop-main',
  components: {
    ShopGiftMain,
    ShopConfirmBuy,
    DraggableBox,
    SearchBar,
    Navigation,
    ShopBody
  },
  computed: {
    ...mapState('catalog', ['catalogDisplayed', 'buyConfirmationDisplayed', 'sendGiftDisplayed']),
  },
  methods: {
    closeBox(): void {
      this.$store.commit('catalog/toggleCatalog');
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-shop {
  width: 580px;
  top: 90px;
  left: 130px;

  .box-body {
    .content {
      padding: 0 15px 15px 15px;

      &.popup-overlay::after {
        content: '';
        position: absolute;
        left: -35px;
        right: 0;
        bottom: 0;
        top: 0;
      }

      .opacify {
        filter: blur(1px) grayscale(70%);
      }

      .hotel-shop-body {
        padding-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
