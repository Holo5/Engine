<template>
  <draggable-box class="hotel-box-console" v-if="consoleDisplayed">
    <span slot="title">Amis</span>
    <div slot="body" class="content">
      <console-search-bar></console-search-bar>
      <console-navigation></console-navigation>
      <console-friends-layout></console-friends-layout>
      <console-textamigos-layout></console-textamigos-layout>
      <console-users-searched-layout></console-users-searched-layout>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import DraggableBox from '../Elements/Box/DraggableBox.vue';
import {mapState} from "vuex";
import ConsoleSearchBar from "./SearchBar.vue";
import ConsoleNavigation from "./Navigation.vue";
import ConsoleFriendsLayout from "./Layouts/Friends.vue";
import ConsoleTextamigosLayout from "./Layouts/Textamigos.vue";
import ConsoleUsersSearchedLayout from "./Layouts/UsersSearched.vue";

export default Vue.extend({
  name: 'console-main',
  computed: {
    ...mapState('console', ['consoleDisplayed', 'currentLayout']),
  },
  components: {
    ConsoleUsersSearchedLayout,
    ConsoleTextamigosLayout,
    ConsoleFriendsLayout,
    ConsoleNavigation,
    ConsoleSearchBar,
    DraggableBox,
  },
  methods: {
    closeBox() {
      this.$store.commit('console/setConsoleDisplayed', false);
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-console {
  width: 350px;
  top: 50px;
  left: 90px;

  .content {
    padding: 0 15px 15px 15px;
  }
}
</style>
