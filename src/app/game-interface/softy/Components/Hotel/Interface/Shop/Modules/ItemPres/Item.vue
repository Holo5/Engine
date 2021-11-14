<template>
  <div>
    <div class="pres item" v-if="actualItem">
      <h1>{{ actualItem.itemDataName }} x{{ actualCatalogItemQuantity }}</h1>
      <div class="price" v-tooltip.bottom="'Prix unitaire: ' + price">
        <div class="icon" :class="priceType"></div>
        <span>{{ price * actualCatalogItemQuantity }}</span>
      </div>
<!--      <div class="ltd" v-if="item.ltd"></div>-->
      <div class="with-badge" v-if="actualItem.hasBadge">
        <img :src="actualItem.badgeUrl" />
      </div>
    </div>
    <div v-else class="pres description" :style="'background-image:url(' + imageUrl + ')'">
      <h1>{{ actualCatalogCaption }}</h1>
      <p>{{ actualPage.texts[0] }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters, mapState} from "vuex";
import {Configuration} from '../../../../../../../../../conf';

export default Vue.extend({
  name: 'shop-modules-item-pres-item',
  computed: {
    ...mapState('catalog', ['actualCatalogCaption', 'actualPage', 'actualCatalogItemQuantity']),
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
    imageUrl() {
      return Configuration.images.catalogDomain + this.actualPage.images[1] + '.gif';
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.pres {
  width: 355px;
  height: 235px;
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
    background-position: center center;

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

    > p {
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

    .with-badge {
      position: absolute;
      right: 15px;
      bottom: 15px;
    }

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
</style>
