<template>
  <div class="items" ref="bloc">
    <div
        class="item"
        v-for="(item, i) in actualPage.catalogItems"
        :key="i"
        @click="showItem(i)"
        :class="[{ active: actualItemIndex === i }, getTypePrice(item)]"
    >
      <img v-if="item.color !== false" :src="catalogIcons + item.displayName + '_' + item.color + '_icon.png'">
      <img v-if="item.color === false" :src="catalogIcons + item.displayName + '_icon.png'">
      <div class="price">
        <div class="icon" :class="item.priceType"></div>
        <span>{{ getPrice(item) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {mapState} from "vuex";
import {Configuration} from '../../../../../../../../../conf';
import {CatalogItem} from '../../../../../../../../core/logic/catalog/items/CatalogItem';

export default Vue.extend({
  name: 'shop-modules-items-list',
  props: {
    itemsPerLine: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    ...mapState('catalog', ['actualItemIndex', 'changeEvent', 'actualPage']),
    catalogIcons() {
      return Configuration.images.iconsDomain;
    },
  },
  methods: {
    getTypePrice(item: CatalogItem): string {
      if (item.credits) {
        return 'credit';
      } else if (item.seasonal) {
        return 'seasonal';
      }

      return 'diamond';
    },
    getPrice(item: CatalogItem): number {
      if (item.credits) {
        return item.creditCost;
      } else if (item.seasonal) {
        return item.seasonalCost;
      }

      return item.diamondCost;
    },
    showItem(index: number): void {
      this.$store.commit('catalog/setChangeEvent', 'clicked');
      this.$store.commit('catalog/setActualItemIndex', index);
    },
  },
  watch: {
    actualItemIndex: {
      handler(newValue: number, oldValue: number): void {
        if (this.changeEvent === 'not-clicked') {
          const itemHeight = 62;
          const spaceBetween = 4;
          const totalItems = this.actualPage.catalogItems.length;
          const bloc = this.$refs.bloc as HTMLElement;

          if (newValue === totalItems - 1) {
            bloc.scrollTo(0, bloc.scrollHeight);
          } else {
            if (newValue > oldValue || newValue === -1) {
              if (newValue > -1 && newValue % this.itemsPerLine === 0) {
                bloc.scrollTo(0, ((itemHeight + spaceBetween) * newValue) / this.itemsPerLine);
              } else if (newValue <= -1) {
                bloc.scrollTo(0, 0);
              }
            } else {
              if (newValue < totalItems - (totalItems % this.itemsPerLine)) {
                if (newValue < totalItems - 1 && (newValue % this.itemsPerLine) + 1 === this.itemsPerLine) {
                  bloc.scrollTo(0, ((itemHeight + spaceBetween) * newValue) / this.itemsPerLine - (itemHeight - spaceBetween));
                }
              }
            }
          }
        }

        this.$store.commit('catalog/setActualItemQuantity', 1);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.items {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 130px;
  margin-top: 15px;
  padding-left: 5px;

  .item {
    width: 47px;
    height: 56px;
    margin-bottom: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    transition: 100ms ease-in-out border-color, 100ms ease-in-out background-color;
    border: 2px solid transparent;

    &:nth-child(7n+1):nth-last-child(-n+7),
    &:nth-child(7n+1):nth-last-child(-n+7) ~ .item {
      margin-bottom: 0;
    }

    img {
      margin-top: -7px;
    }

    .price {
      position: absolute;
      bottom: -8px;
      padding: 2px 5px 2px 2px;
      border-radius: $small-border-radius;
      background-color: transparent;
      transition: 100ms ease-in-out background-color;
      display: flex;
      flex-direction: row;

      span {
        font-size: 10px;
        margin-left: 3px;
        font-weight: bold;
        transition: 200ms ease-in-out color;
      }
    }

    &.ltd {
      border-color: transparent !important;

      &::after {
        content: "";
        position: absolute;
        left: -2px;
        right: -2px;
        bottom: -8px;
        top: -2px;
        background-image: url('../../../../../../assets/images/sprite-itf1.png');
        background-position: 0 -89px;
        z-index: -1;
        transition: 200ms ease-in-out opacity;
        opacity: 1;
      }

      .price {
        background-color: transparent !important;
      }

      &:hover,
      &.active {
        &::after {
          opacity: 0.7;
        }
      }
    }

    &.credit {
      &:hover,
      &.active {
        border-color: $credit;

        .price {
          background-color: $credit;
        }
      }

      .price .icon {
        @include itf-icon(11px, 11px, -54px, -57px);
      }
    }

    &.diamond {
      &:hover,
      &.active {
        border-color: $diamond;

        .price {
          background-color: $diamond;
        }
      }

      .price .icon {
        @include itf-icon(11px, 11px, -66px, -57px);
      }
    }

    &.seasonal {
      &:hover,
      &.active {
        border-color: $ducket;

        .price {
          background-color: $ducket;
        }
      }

      .price .icon {
        @include itf-icon(11px, 11px, -54px, -69px);
      }
    }
  }
}
</style>
