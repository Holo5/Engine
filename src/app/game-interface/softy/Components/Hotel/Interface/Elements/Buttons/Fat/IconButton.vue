<template>
  <div
    :class="['button', { withIcon: icon }, icon, { animation }]"
    :style="'background-color: ' + color"
    @click="$emit('click')"
  >
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'modules-button',
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
    animation: {
      type: Boolean,
      default: true
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.button {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: $medium-border-radius;
  width: 100%;
  display: flex;
  min-height: 38px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 200ms ease-in-out background-color;

  span {
    text-transform: uppercase;
    font-weight: bold;
    color: $white;
    font-size: 14px;
  }

  &.withIcon {
    padding-left: 44px;

    &::after {
      position: absolute;
      content: "";
      left: 10px;
      top: -7px;
      transition: 500ms ease-in-out top;
    }

    &.duck::after {
      @include itf-icon(44px, 50px, -109px, 0);
    }

    &.forum::after {
      @include itf-icon(44px, 50px, -110px, -51px);
    }

    &.create-room::after {
      transform: translateY(6px);

      @include itf-icon(55px, 40px, -245px, -0);
    }

    &.leave::after {
      @include itf-icon(55px, 57px, -62px, -111px);
    }

    &.door::after {
      @include itf-icon(44px, 36px, -200px, 0);

      transform: translateY(7px);
    }

    &.key,
    &.password,
    &.key-opened {
      padding-left: 24px;

      &::after {
        transform: translateY(14px) translateX(1px);
      }

      &.key::after {
        @include itf-icon(19px, 24px, -200px, -37px);
      }

      &.password::after {
        @include itf-icon(19px, 24px, -220px, -37px);
      }

      &.key-opened::after {
        @include itf-icon(19px, 24px, -296px, -38px);
      }
    }

    &.item-build::after {
      @include itf-icon(50px, 50px, -137px, -119px);
    }

    &.actions-and-effects {
      padding-left: 60px;

      &::after {
        @include itf-icon(43px, 32px, -191px, -96px);

        transform: translateY(10px) translateX(-5px);
      }
    }

    &.clothes::after {
      @include itf-icon(30px, 32px, -227px, -129px);

      transform: translateY(10px) translateX(2px);
    }

    &.profile::after {
      @include itf-icon(32px, 30px, -235px, -96px);

      transform: translateY(11px);
    }

    &.settings {
      &::after {
        @include itf-icon(38px, 38px, -188px, -129px);

        transform: translateY(7px) translateX(-2px);
      }
    }

    &.message::after {
      @include itf-icon(36px, 48px, -319px, 0);

      transform: translateY(2px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: $white;
    z-index: -1;
    border-radius: $medium-border-radius;
    opacity: 0;
    transition: 200ms ease-in-out opacity;
  }

  &:hover {
    &.animation {
      &::after {
        animation: pop 1.2s ease-in-out infinite;
      }
    }

    &::before {
      opacity: 0.1;
    }
  }
}

@keyframes pop {
  0%, 80%, 100% {
    top: -7px;
  }

  40% {
    top: -11px;
  }
}
</style>
