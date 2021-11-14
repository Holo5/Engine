<template>
  <div class="left-navigation">
    <ul class="nav-body error" v-if="!catalogSecondCategoriesPages">
      <span>Catégorie vide</span>
    </ul>
    <ul class="nav-body" v-else>
      <shop-tree-navigation v-for="page in catalogSecondCategoriesPages" :page="page" :depth="0"></shop-tree-navigation>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import {CatalogPage} from "../../../../../../core/logic/catalog/CatalogPage";
import ShopTreeNavigation from "./LeftNavigation/Tree.vue";

export default Vue.extend({
  name: 'left-navigation',
  components: {
    ShopTreeNavigation
  },
  computed: {
    ...mapState('catalog', ['catalogSecondCategoriesPages']),
  },
  watch: {
    catalogSecondCategoriesPages(newList) {
      this.$store.dispatch('catalog/itemsRequest', newList[0].id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";

.left-navigation {
  margin-left: -50px;
  background-color: $grey-light;
  border-radius: $big-border-radius;
  padding: 10px 10px 10px 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  width: 180px;
  z-index: 999;

  .nav-body {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 413px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.error {
      > span {
        font-size: 14px;
        color: $white;
        padding: 3px 6px 6px 15px;
      }
    }
  }
}
</style>
