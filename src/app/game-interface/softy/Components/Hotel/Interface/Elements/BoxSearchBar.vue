<template>
  <div :class="['box-search-bar', color, `icon-${icon}`]">
    <div class="icon"></div>
    <input type="text" :placeholder="placeholder" v-model="inputValue" @keyup="keyup"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'box-search-bar',
  props: {
    placeholder: {
      type: String,
      default: 'Rechercher...',
    },
    color: {
      type: String,
      default: 'yellow',
    },
    icon: {
      type: String,
      default: 'shop',
    },
    valueWatched: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    inputValue: '',
  }),
  watch: {
    inputValue(newValue, oldValue) {
      this.$emit('updateValue', newValue);
    },
    valueWatched(newValue, oldValue) {
      this.inputValue = newValue;
    },
  },
  methods: {
    keyup(e: KeyboardEvent) {
      this.$emit('keyup', e);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/mixins";

.box-search-bar {
  width: 100%;
  border-radius: $medium-border-radius;
  display: flex;
  flex-direction: row;

  &.yellow {
    background-color: $yellow;
  }

  &.green {
    background-color: $green;
  }

  &.saumon {
    background-color: $salmon;
  }

  &.purple {
    background-color: $purple;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 5px;
    bottom: 0;
    z-index: -1;
    border-bottom-right-radius: $medium-border-radius;
    border-top-right-radius: $medium-border-radius;
  }

  &.icon-shop::after {
    @include itf-icon(48px, 30px, -109px, 0);
  }

  &.icon-room::after {
    @include itf-icon(44px, 30px, -155px, -45px);

    margin-right: 6px;
    margin-top: -2px;
  }

  &.icon-inventory::after {
    @include itf-icon(38px, 35px, -240px, -47px);

    margin-right: 6px;
    margin-top: -5px;
    border-radius: 0 0 4px 0;
  }

  &.icon-friend::after {
    @include itf-icon(32px, 33px, -207px, -62px);

    margin-right: 11px;
    border-radius: 0 0 0 0;
    margin-top: -3px;
  }

  .icon {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    padding-left: 2px;

    &::after {
      content: '';
      position: absolute;

      @include itf-icon(16px, 16px, -81px, 0);
    }
  }

  input {
    background-color: $white;
    width: calc(100% - 35px - 55px);
    border-radius: $medium-border-radius;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
    line-height: 35px;
    padding: 0 15px;
    font-size: 14px;
  }
}
</style>
