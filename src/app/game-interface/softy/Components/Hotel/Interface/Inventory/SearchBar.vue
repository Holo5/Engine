<template>
  <search-bar color="saumon" icon="inventory" placeholder="Rechercher un mobi" model="model" @keyup="submit"></search-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '../Elements/BoxSearchBar.vue';

export default Vue.extend({
  name: 'inventory-search-bar',
  components: {
    SearchBar
  },
  data: function () {
    return {
      model: ''
    };
  },
  methods: {
    submit(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        // this.$store.dispatch('navigator/createRequest', this.model);
      }
    }
  }
});
</script>
