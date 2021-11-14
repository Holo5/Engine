<template>
  <div class="preview">
    <slot name="preview"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'inventory-preview',
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";

.preview {
  width: 150px;
  height: 278px;
  background: linear-gradient(180deg, lighten($salmon, 18) 0%, $salmon 100%);
  border-radius: $medium-border-radius;
  transition: 150ms ease-in-out all;

  &.disabled {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
</style>
