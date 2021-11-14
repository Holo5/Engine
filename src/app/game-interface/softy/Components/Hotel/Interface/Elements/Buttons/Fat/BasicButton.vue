<template>
  <div class="button hotel-button" :class="finalButtonClass">
    {{ body }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'elements-buttons-basic',
  props: {
    room: Number,
    url: String,
    body: String,
    color: {
      type: String,
      default: 'blue',
    },
    radius: {
      type: String,
      default: 'bit-round',
    },
    opacity: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    finalButtonClass(): string {
      return `color-${this.color} radius-${this.radius} start-opacity-${this.opacity}`.trim();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.hotel-button {
  $border-radius: (
      'square': $small-border-radius,
      'bit-round': $medium-border-radius,
      'round': $big-border-radius
  );

  $colors: (
      'blue': $blue,
      'black': $black,
      'white': $white,
      'winter': $winter,
      'grey': $grey,
      'saumon': $salmon,
  );

  $start-opacity: (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100);

  @include full-width;

  font-size: 13px;
  padding: 10px 12px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  transition: 200ms ease-in-out background-color;

  @each $name, $color in $colors {
    &.color-#{$name} {
      @each $opacity in $start-opacity {
        &.start-opacity-#{$opacity} {
          $start-darken: 100 - $opacity;

          background-color: darken($color, $start-darken);

          @if ($start-darken - 10 < 0) {
            &:hover {
              background-color: darken($color, 0);
            }
          } @else {
            &:hover {
              background-color: darken($color, $start-darken - 10);
            }
          }
        }
      }

      @if ($name == 'saumon') {
        color: $white;
      }
    }
  }

  @each $name, $radius in $border-radius {
    &.radius-#{$name} {
      border-radius: $radius;
    }
  }
}
</style>
