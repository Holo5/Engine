<template>
  <div class="layout-error">
    <span>Il n'y a rien ici pour le moment mais rien ne t'empêche d'<a @click="openShop">ouvrir le catalogue</a> afin de remplir ton inventaire !</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'layout-empty',
  methods: {
    openShop() {
      this.$store.commit('catalog/displayCatalog');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";

.layout-error {
  position: absolute;
  left: -10px;
  right: -10px;
  bottom: -10px;
  top: 0;
  z-index: 999;
  padding: 0 50px 25px;
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
