<template>
  <div class="hotel-shop-page">
    <div class="top">
      <item-pres-badge class="pres-item" :category="category" :item="currentItem" :count="1"></item-pres-badge>
    </div>
    <div class="middle">
      <badges-plate-list class="left" ref="itemsBloc" :items="[]" :selectedBadgeIndex="selectedBadgePlateIndex" :itemsPerLine="2"></badges-plate-list>
      <badges-list class="right" ref="badgesBloc" :items="[]" :selectedBadgeIndex="selectedBadgeIndex" :itemsPerLine="5"></badges-list>
    </div>
    <div class="buttons" :class="{ disabled: selectedBadgePlateIndex <= -1 }">
      <shop-button :icon="'duck'" :text="'Acheter ce magnifique présentoir'" @click.native="buy"></shop-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemPresBadge from '../Modules/ItemPres/Badge.vue';
import BadgesPlateList from '../Modules/List/BadgesPlateList.vue';
import BadgesList from '../Modules/List/BadgesList.vue';
import ShopButton from '../../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'shop-layout-badge-display',
  components: {
    ItemPresBadge,
    BadgesPlateList,
    BadgesList,
    ShopButton
  },
  props: {
    category: Object,
  },
  computed: {
    currentItem() {
    },
    fakeItems(): Array<HoloInterface.Shop.Item> {
      return [];
    },
  },
  data: () => ({
    selectedBadgePlateIndex: 0,
    selectedBadgeIndex: 0,
    changeEvent: undefined as undefined | String,
  }),
  methods: {
    showItem(index: number): void {
      // TODO: render combinaison
      this.selectedBadgePlateIndex = index;
      this.changeEvent = 'clicked';
    },
    buy(): void {
      // TODO: Buy item
    },
  },
  mounted(): void {
    this.$root.$emit('shop-enable-navigation');
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
    margin-left: 15px;
  }

  .middle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left {
      width: 144px !important;
      margin-right: 11px;
      margin-left: 10px;
    }

    .right {
      width: calc(100% - 152px);
      height: 130px;
      margin-top: 15px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0 0 15px;
    opacity: 1;
    transition: 200ms ease-in-out opacity, 200ms ease-in-out filter;
    filter: grayscale(0);

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
  }
}
</style>
