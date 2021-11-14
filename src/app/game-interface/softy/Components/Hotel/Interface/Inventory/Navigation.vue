<template>
  <div class="hotel-navigation">
    <navigation-link label="Mobis" layout="items"></navigation-link>
    <navigation-link label="Adoptions" layout="pets"></navigation-link>
    <navigation-link label="Badges" layout="badges"></navigation-link>
    <navigation-link label="Bots" layout="bots"></navigation-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationLink from "./Navigation/link.vue";

export default Vue.extend({
  name: 'inventory-navigation',
  components: {
    NavigationLink,
  },
});
</script>

<style lang="scss" scoped>
.hotel-navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0 0 -5px;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
