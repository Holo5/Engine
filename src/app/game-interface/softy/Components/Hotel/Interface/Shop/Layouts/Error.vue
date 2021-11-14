<template>
  <div class="hotel-shop-page type-error"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'shop-layout-error',
  mounted(): void {
    this.$root.$emit('shop-enable-navigation');
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/mixins";

.hotel-shop-page.type-error {
  height: 100%;
  width: 100%;
  margin-left: -15px;
  background-image: url('../../../../../assets/images/frankohcrap.png');
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.2;
}
</style>
