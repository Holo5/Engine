<template>
  <box-search-bar color="purple" icon="friend" placeholder="Rechercher un utilisateur" @updateValue="searchUser" :valueWatched="searchValue"></box-search-bar>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import BoxSearchBar from "../Elements/BoxSearchBar.vue";

export default Vue.extend({
  name: "console-search-bar",
  components: {
    BoxSearchBar
  },
  computed: {
    ...mapState('console', ['consoleDisplayed', 'searchValue']),
  },
  data: () => ({
    debounceTimer: null,
  }),
  methods: {
    searchUser(value: string) {
      clearTimeout(this.debounceTimer);

      this.$store.commit('console/setSearchValue', value);

      if (value.trim() === '') {
        this.$store.commit('console/setCurrentLayout', 'friends');
      } else {
        this.debounceTimer = setTimeout(() => {
          this.$store.commit('console/setCurrentLayout', 'searched');
          this.$store.dispatch('console/searchUser');
        }, 300);
      }
    },
  },
});
</script>

<style lang="scss" scoped>

</style>