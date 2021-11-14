<template>
  <elements-draggable-box :is-draggable="false" class="hotel-box-shop-gift" v-if="sendGiftDisplayed">
    <span slot="title">Customise ton cadeau</span>
    <div slot="body" class="content">
      <gift-select-friend></gift-select-friend>
      <div class="buttons">
        <shop-button class="danger" color="#c53131" text="Annuler" @click.native="closeBox"></shop-button>
        <shop-button text="Offrir ce cadeau" icon="duck" @click.native="buy"></shop-button>
      </div>
    </div>
  </elements-draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import IconButton from '../../Elements/Buttons/Small/IconButton.vue';
import ShopButton from '../../Elements/Buttons/Fat/IconButton.vue';
import {mapState} from "vuex";
import ElementsDraggableBox from "../../Elements/Box/DraggableBox.vue";
import GiftSelectFriend from "./SelectFriend.vue";

export default Vue.extend({
  name: 'shop-gift-main',
  computed: {
    ...mapState('catalog', ['sendGiftDisplayed', 'giftWrappingConfiguration', 'currentBoxType'])
  },
  components: {
    GiftSelectFriend,
    ElementsDraggableBox,
    IconButton,
    ShopButton
  },
  methods: {
    closeBox(): void {
      this.$store.commit('catalog/resetGiftDataAndHide');
    },
    buy(): void {
      this.$store.dispatch('catalog/sendGift');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-box-shop-gift {
  width: 355px;
  left: calc(50% - 355px / 2);
  top: calc(50% - 245px / 2);
  position: absolute;
  z-index: 999;

  .box-body > .content {
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;

    > .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 15px 0 0 0;
      opacity: 1;
      transition: 200ms ease-in-out opacity, 200ms ease-in-out filter;
      filter: grayscale(0);

      .danger {
        width: calc(100% - 130px - 15px);
        margin-right: 15px;
      }
    }
  }
}

@keyframes pop {
  0%, 80%, 100% {
    top: -7px;
  }

  40% {
    top: -11px;
  }
}
</style>
