<template>
  <div class="button hotel-icon-button" :class="finalButtonClass"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'elements-icon-button',
  props: {
    type: {
      type: String,
      default: 'round',
    },
    icon: String,
    opacity: {
      type: Number,
      default: 60,
    },
    theme: {
      type: String,
      default: 'dark',
    },
  },
  computed: {
    finalButtonClass(): string {
      const icon = this.icon ? `icon-${this.icon}` : '';

      return `${icon} ${this.theme}-${this.type} opacity-${this.opacity}`.trim();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/mixins";

$icons: (
    'question': 0px,
    'cog': -19px,
    'leave': -38px,
    'close': -57px,
    'plus': -76px,
    'minus': -95px,
    'next': -114px,
    'prev': -133px,
    'tick': -152px,
    'small-close': -171px,
    'follow': -190px,
    'emote': -209px,
    'message': -228px,
    'empty': -247px,
    'empty-border': -266px,
    'add-user': -285px,
);

$icons-states: (
    'dark-round': 0,
    'dark-square': -19px,
    'dark-transparent': -38px,
    'light-round': -57px,
    'light-square': -76px,
    'light-transparent': -95px
);

.hotel-icon-button {
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-image: url('../../../../../../assets/images/sprite-icons.png');
  cursor: pointer;
  transition: 200ms ease-in-out opacity;

  @each $opacity in (100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0) {
    $final-opacity: $opacity / 100;

    &.opacity-#{$opacity} {
      opacity: $final-opacity;

      &:hover {
        opacity: #{$final-opacity - 0.15};
      }
    }
  }

  @each $icon, $position in $icons {
    @each $state-name, $state-position in $icons-states {
      &.icon-#{$icon}.#{$state-name} {
        background-position: $position $state-position;
      }
    }
  }
}
</style>
