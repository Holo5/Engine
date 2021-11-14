<template>
  <div class="small-icon-button" :style="'background-color: ' + bgColor" @mouseover="toggleHover" @mouseout="toggleHover">
    <elements-icon-button :type="iconType" :theme="iconTheme" :opacity="1" :icon="icon"></elements-icon-button>
    <span :class="'align-' + align">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsIconButton from '../Small/IconButton.vue';

export default Vue.extend({
  name: 'small-icon-button',
  components: {
    ElementsIconButton
  },
  computed: {
    bgColor() {
      return this.hovered ? this.hoverColor : this.color;
    },
  },
  props: {
    icon: {
      type: [String, Boolean],
      default: false,
    },
    text: String,
    color: {
      type: String,
      default: '#52bc48',
    },
    hoverColor: {
      type: [String, Boolean],
      default: false,
    },
    iconType: {
      type: String,
      default: 'round',
    },
    iconTheme: {
      type: String,
      default: 'light',
    },
    align: {
      type: String,
      default: 'left',
    },
  },
  data: () => ({
    hovered: false,
  }),
  methods: {
    toggleHover() {
      this.hovered = !this.hovered;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.small-icon-button {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: $medium-border-radius;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 38px;
  cursor: pointer;
  transition: 200ms ease-in-out opacity;
  opacity: 1;

  .button {
    margin: 0 12px 0 13px;
  }

  span {
    text-transform: uppercase;
    font-weight: bold;
    color: $white;
    font-size: 14px;

    &.align-left {
      text-align: left;
    }

    &.align-center {
      text-align: center;
      width: calc(100% - 68px);
    }

    &.align-right {
      text-align: right;
    }
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
