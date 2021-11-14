<template>
  <div class="goto" :class="type">
    <div class="icon"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-modules-item-pres-goto',
  props: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.goto {
  width: calc((100% - 355px - 6px) / 2);
  background-image: url('../../../../../../assets/images/itemplate.png');
  height: 235px;
  display: flex;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 200ms ease-in-out opacity;
  opacity: 1;

  &.rotate {
    width: calc((100% - 355px - 15px) / 2 + 15px);
    border-top-right-radius: $medium-border-radius;
    border-bottom-right-radius: $medium-border-radius;
    margin-right: 6px;
    background-position: bottom right;
    padding-left: 15px;
  }

  &:hover {
    opacity: 0.8;
  }

  .icon {
    @include itf-icon(6px, 16px, -47px, -56px);

    position: absolute;
  }

  &.prev {
    width: calc((100% - 355px - 15px) / 2 + 15px);
    border-top-right-radius: $medium-border-radius;
    border-bottom-right-radius: $medium-border-radius;
    margin-right: 6px;
    background-position: bottom right;
    padding-left: 15px;
  }

  &.next {
    border-top-left-radius: $medium-border-radius;
    border-bottom-left-radius: $medium-border-radius;
    margin-left: 6px;
    background-position: bottom left;

    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>
