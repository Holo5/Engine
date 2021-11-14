<template>
  <div class="col">
    <current-item :item="selectedItem"></current-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CurrentItem from './CurrentItem.vue';

export default Vue.extend({
  name: 'base-down-right',
  components: {
    CurrentItem
  },
  data: () => ({
    selectedItem: {}
  })
});
</script>

<style lang="scss" scoped>
.col {
  width: 210px;
}
</style>
