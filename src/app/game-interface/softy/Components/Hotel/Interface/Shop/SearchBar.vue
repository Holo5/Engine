<template>
  <search-bar color="yellow" icon="shop" placeholder="Rechercher un mobi, une catégorie, ..." model="model"></search-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '../Elements/BoxSearchBar.vue';

export default Vue.extend({
  name: 'shop-search-bar',
  components: {
    SearchBar
  },
  data: () => ({
    model: '',
  }),
});
</script>
