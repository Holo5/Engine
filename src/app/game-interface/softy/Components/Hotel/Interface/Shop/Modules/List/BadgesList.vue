<template>
  <div class="items" ref="bloc">
    <div
        class="item"
        v-for="(item, i) in items"
        :key="i"
        @click="showItem(i)"
        :class="[{ active: selectedBadgeIndex === i }, item.priceType]"
    >
      <img :src="'https://swf.habbocity.me/c_images/album1584/' + item.badge_code + '.gif'" :alt="item.badge_code"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-modules-badges-list',
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
      (this.$parent as any).selectedBadgeIndex = index;
      (this.$parent as any).changeEvent = 'clicked';
    },
  },
  watch: {
    selectedItemIndex: {
      handler(newValue: number, oldValue: number): void {
        if ((this.$parent as any).changeEvent == 'not-clicked') {
          const itemHeight = 48;
          const spaceBetween = 5;
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

        if ((this.$parent as any).badgesCount) {
          (this.$parent as any).badgesCount = 1;
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

  .item {
    width: 51px;
    height: 48px;
    margin-bottom: 11px;
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

    &:nth-child(4n+1):nth-last-child(-n+4),
    &:nth-child(4n+1):nth-last-child(-n+4) ~ .item {
      margin-bottom: 0;
    }

    &:hover,
    &.active {
      border-color: $black;
    }
  }
}
</style>
