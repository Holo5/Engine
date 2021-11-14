<template>
  <div :class="['list', { 'user': user !== 'self' }]">
    <b v-if="user === 'self'">Tu proposes</b>
    <b v-else>{{ username }} propose</b>
    <div class="body">
      <div class="items">
        <trade-area-item :clickable="user === 'self'" v-for="item in items" :item="item"></trade-area-item>
        <div class="item-empty" v-for="i in (9 - items.length)"></div>
      </div>
      <div :class="['state', { 'locked': lockState }]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TradeAreaItem from "./List/Item.vue";

export default Vue.extend({
  name: 'trade-area-list',
  components: {
    TradeAreaItem,
  },
  props: {
    user: {
      type: String,
      default: 'self',
    },
    lockState: Boolean,
    items: Array,
  },
  computed: {
    username() {
      return this.user === 'self' ? 'Tu' : this.user;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/variables";
@import "../../../../../../../assets/sass/mixins";

.list {
  display: flex;
  flex-direction: column;

  b {
    color: #666666;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    margin-top: 10px;
    padding: 0 2px;
  }

  .body {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    .items {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 10px;
      padding-right: 5px;
      justify-content: flex-start;

      .item-empty {
        border: 2px solid rgba(102, 102, 102, 0.2);
        width: 43px;
        height: 40px;
        margin: 0 5px 5px 0;
        border-radius: $medium-border-radius;
      }
    }

    .state {
      &.locked {
        @include itf-icon(21px, 24px, -200px, -37px);
      }

      &:not(.locked) {
        @include itf-icon(21px, 24px, -296px, -38px);
      }
    }
  }

  &.user {
    b {
      text-align: right;
    }

    .body {
      flex-direction: row-reverse;

      .items {
        justify-content: flex-end;
        padding-right: 0;
        padding-left: 5px;

        ::v-deep .item-selectable,
        .item-empty {
          margin-right: 0;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>