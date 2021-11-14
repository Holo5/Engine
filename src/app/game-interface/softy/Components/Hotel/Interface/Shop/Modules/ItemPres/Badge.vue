<template>
  <div>
    <div class="pres item" v-if="item">
      <h1>{{ item.caption }} x{{ count }}</h1>
      <div class="price" v-tooltip.bottom="'Prix unitaire: ' + item.price">
        <div class="icon" :class="item.priceType"></div>
        <span>{{ item.price * count }}</span>
      </div>
      <div class="ltd" v-if="item.ltd"></div>
      <!-- TODO: Item rendering here -->
    </div>
    <div v-else class="pres description" :style="'background-image:url(' + category.itempage.image + ')'">
      <h1>{{ category.caption }}</h1>
      <p>{{ category.itempage.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-modules-item-pres-badge',
  props: {
    category: Object,
    item: Object,
    count: Number,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.pres {
  width: 405px;
  height: 255px;
  border-radius: $medium-border-radius;
  overflow: hidden;
  padding: 15px;
  display: flex;

  h1 {
    color: $white;
    font-size: 20px;
  }

  &.description {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-image: linear-gradient(to top, $black, transparent);
    }

    p {
      color: $white;
      font-size: 13px;
      margin-top: 5px;
    }
  }

  &.item {
    background-image: url('../../../../../../assets/images/itemplate.png');
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-color: #000;

    .ltd {
      @include itf-icon(44px, 29px, -48px, -81px);

      position: absolute;
      left: 15px;
      bottom: 15px;
    }

    .price {
      background-color: $white;
      border-radius: $small-border-radius;
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

        &.ducket {
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
</style>
