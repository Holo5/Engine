<template>
  <div class="down">
    <base-down-left></base-down-left>
    <navbar></navbar>
    <base-down-right></base-down-right>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './Navbar.vue';
import BaseDownLeft from './LeftElements/Main.vue';
import BaseDownRight from './RightElements/Main.vue';

export default Vue.extend({
  name: 'base-down',
  components: {
    BaseDownRight,
    BaseDownLeft,
    Navbar
  }
});
</script>

<style lang="scss" scoped>
.down {
  position: fixed;
  right: 15px;
  bottom: 15px;
  left: 15px;
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  pointer-events: none;
  align-items: flex-end;
}
</style>
