<template>
  <transition name="fade">
    <div class="hotel-box">
      <div class="box-top">
        <slot name="title"></slot>
      </div>
      <div class="box-body">
        <slot name="body"></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'elements-white-box',
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.hotel-box {
  @include blur-background;
  background-color: rgba($white, 0.97);
  border-radius: $big-border-radius;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  pointer-events: auto;

  .box-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 15px;

    &::v-deep span {
      font-size: 22px;
      line-height: 16px;
      font-weight: bold;
      letter-spacing: -1px;
    }
  }
}
</style>
