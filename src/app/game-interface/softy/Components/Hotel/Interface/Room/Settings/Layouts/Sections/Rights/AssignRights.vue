<template>
  <div class="group">
    <search-bar color="purple" icon="friend" placeholder="Rechercher un ami à acréditer" @updateValue="searchUserInList"></search-bar>
    <users-without-rights-list :searchValue="searchValue"></users-without-rights-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SearchBar from "../../../../../Elements/BoxSearchBar.vue";
import UsersWithoutRightsList from "./Lists/WithoutRights/List.vue";

export default Vue.extend({
  name: "assign-rights",
  components: {
    UsersWithoutRightsList,
    SearchBar
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
  },
  data: () => ({
    searchValue: '',
  }),
  methods: {
    searchUserInList(value: string) {
      this.searchValue = value;
    },
  },
});
</script>