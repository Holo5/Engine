<template>
  <div class="hotel-shop-page type-frontpage">
    <div class="left">
      <div class="image" :style="'background-image:url(' + image(0).image + ')'" @click="open(0)">
        <span>{{ image(0).caption }}</span>
      </div>
    </div>
    <div class="right">
      <div class="image" :style="'background-image:url(' + image(i).image + ')'" v-for="i in 3" :key="i" @click="open(1)">
        <span>{{ image(i).caption }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-layout-frontpage',
  props: {
    category: Object,
  },
  methods: {
    image(index: number): HoloInterface.Shop.Layout.Frontpage | boolean {
      return this.category.frontpage ? this.category.frontpage[index] : false;
    },
    open(index: number): void {
      // TODO: open category
    },
  },
  mounted(): void {
    this.$root.$emit('shop-disable-navigation');
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.hotel-shop-page.type-frontpage {
  width: calc(100% + 180px - 50px);
  height: 433px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .image {
    width: 100%;
    background-repeat: no-repeat;
    border-radius: $medium-border-radius;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    align-content: flex-end;
    transition: 200ms ease-in-out opacity;
    opacity: 1;

    &:hover {
      opacity: 0.9;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      bottom: 0;
      right: 0;
      z-index: -1;
      border-radius: $medium-border-radius;
      background-image: linear-gradient(to top, rgba($black, 0.8), transparent);
    }

    span {
      width: 100%;
      color: $white;
      padding: 15px 18px;
      font-size: 16px;
    }
  }

  .left {
    width: 180px;
    height: 100%;

    .image {
      height: 100%;
    }
  }

  .right {
    width: calc(100% - 180px - 15px);
    display: flex;
    flex-direction: column;
    align-content: space-between;
    height: 100%;

    .image {
      height: 100%;

      &:not(:first-child) {
        margin-top: 15px;
      }

      &::after {
        top: 0;
      }
    }
  }
}
</style>
