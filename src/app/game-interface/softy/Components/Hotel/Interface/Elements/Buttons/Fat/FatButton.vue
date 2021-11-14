<template>
  <div :class="['fat-button', position, { opacify }]" :style="`background-color: ${color}`" @click="$emit('click')">
    <slot name="body">
      <div class="icon">
        <div class="image" :class="icon" v-if="icon"></div>
      </div>
    </slot>
    <div class="indicator" v-if="indicator > 0">
      {{ indicator }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'elements-fat-button',
  props: {
    color: {
      type: String,
      default: '#a3a3a3'
    },
    icon: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'center' // center, up, down
    },
    indicator: {
      type: Number,
      default: 0
    },
    opacify: {
      type: Boolean,
      default: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/mixins";

.fat-button {
  cursor: pointer;
  height: 36px;
  width: 60px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: $medium-border-radius;

  &.opacify {
    opacity: 1;
    transition: 150ms ease-in-out opacity;

    &:hover {
      opacity: 0.8;
    }
  }

  .indicator {
    position: absolute;
    right: -2px;
    top: -2px;
    line-height: 16px;
    border-radius: $medium-border-radius;
    background-color: $red;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    color: $white;
    padding: 0 5px;
    font-weight: bold;
  }

  .icon {
    opacity: 1;
    transition: 200ms ease-in-out opacity;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;

    .image {
      flex: none;
      order: 0;
      flex-grow: 0;

      &.money {
        @include itf-icon(18px, 18px, -155px, -76px);
      }

      &.move {
        @include itf-icon(18px, 18px, -174px, -76px);
      }

      &.pointer {
        @include itf-icon(16px, 16px, -155px, -95px);
      }

      &.rotate {
        @include itf-icon(18px, 16px, -172px, -95px);
      }

      &.catch {
        @include itf-icon(16px, 18px, -279px, -41px);
      }

      &.room {
        @include itf-icon(18px, 16px, -258px, -147px);
      }

      &.message {
        @include itf-icon(18px, 19px, -258px, -127px);
      }

      &.home {
        @include itf-icon(18px, 18px, -294px, -119px);
      }

      &.thumbsup {
        @include itf-icon(16px, 18px, -277px, -119px);
      }

      &.flag {
        @include itf-icon(17px, 18px, -313px, -119px);
      }

      &.question {
        @include spr-icon(0, -57px);
      }

      &.chev-right {
        @include spr-icon(-114px, -57px);
      }
    }
  }

  &:hover .icon {
    opacity: 0.8;
  }
}
</style>
