<template>
  <div class="items" ref="bloc">
    <div
        class="item"
        v-for="(item, i) in items"
        :key="i"
        @click="showItem(i)"
        :class="[{ active: selectedBadgeIndex === i }, item.priceType]"
    >
      <img :src="item.icon"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-modules-badges-plate-list',
  props: {
    items: Array,
    selectedBadgeIndex: Number,
    itemsPerLine: {
      type: Number,
      default: 7,
    },
  },
  methods: {
    showItem(index: number): void {
      (this.$parent as any).selectedBadgePlateIndex = index;
      (this.$parent as any).changeEvent = 'clicked';
    },
  },
  watch: {
    selectedItemIndex: {
      handler(newValue: number, oldValue: number): void {
        if ((this.$parent as any).changeEvent == 'not-clicked') {
          const itemHeight = 47;
          const spaceBetween = 4;
          const totalItems = this.items.length;
          const bloc = this.$refs.bloc as HTMLElement;

          if (newValue > oldValue || newValue == -1) {
            if (newValue > -1 && newValue % this.itemsPerLine == 0) {
              bloc.scrollTo(0, ((itemHeight + spaceBetween) * newValue) / this.itemsPerLine);
            } else if (newValue <= -1) {
              bloc.scrollTo(0, 0);
            }
          } else {
            if (newValue < totalItems - (totalItems % this.itemsPerLine)) {
              if (newValue < totalItems - 1 && (newValue % this.itemsPerLine) + 1 == this.itemsPerLine) {
                bloc.scrollTo(0, ((itemHeight + spaceBetween) * newValue) / this.itemsPerLine - (itemHeight - spaceBetween));
              }
            }
          }
        }
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
  height: 108px !important;
  margin-top: 15px;
  padding-left: 5px;

  .item {
    width: 52px;
    height: 48px;
    margin-bottom: 12px;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    transition: 100ms ease-in-out border-color, 100ms ease-in-out background-color;
    border: 2px solid transparent;

    &:nth-child(2n+1):nth-last-child(-n+2),
    &:nth-child(2n+1):nth-last-child(-n+2) ~ .item {
      margin-bottom: 0;
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

    &.ducket {
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
