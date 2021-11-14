<template>
  <div class="layout-error">
    <span>
      Cette page est actuellement en cours de construction ! Rend toi sur le serveur
      <a href="https://discord.com/invite/tPjAtmf" target="_blank">discord d'Holo5</a> afin de suivre l'avancement.
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'inventory-under-construction',
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";

.layout-error {
  padding: 25px 50px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  span {
    font-size: 18px;
    line-height: 22px;

    a {
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
      color: $salmon;
    }
  }
}
</style>
