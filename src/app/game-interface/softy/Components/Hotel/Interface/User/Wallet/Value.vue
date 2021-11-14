<template>
  <div id="user-wallet-span" :class="`type-${type}`">
    <div class="icon"></div>
    <div class="amount">
      {{ amount.toLocaleString() }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'user-wallet-value',
  props: {
    type: {
      type: String,
      default: 'credit',
    },
    amount: Number,
  },
});
</script>

<style lang="scss">
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

#user-wallet-span {
  display: flex;
  flex-direction: row;
  padding: 0 17px 7px 0;
  justify-content: space-between;

  .icon {
    width: 15px;
    height: 15px;
    background-image: url('../../../../../assets/images/sprite-itf1.png');
    margin-left: -7.5px;
    transition: 200ms ease-in-out filter;
    filter: drop-shadow(0 0 0px transparent);
  }

  .amount {
    text-align: right;
    margin-left: 23px;
    font-size: 16px;
    font-weight: bold;
    line-height: 14px;
    color: transparent;
    transition: 200ms ease-in-out color;
  }

  &.type-diamond {
    .amount {
      color: $diamond;
    }

    .icon {
      background-position: 0 0;
    }

    &:hover .amount {
      color: darken($diamond, 5);
    }
  }

  &.type-credit {
    .amount {
      color: darken($credit, 5);
    }

    .icon {
      background-position: -16px 0;
    }

    &:hover .amount {
      color: darken(darken($credit, 5), 5);
    }
  }

  &.type-ducket {
    .amount {
      color: $ducket;
    }

    .icon {
      background-position: -32px 0;
    }

    &:hover .amount {
      color: darken($ducket, 5);
    }
  }
}
</style>
