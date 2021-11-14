<template>
  <div class="layout friends" v-show="currentLayout === 'searched'">
    <div class="friends-lists">
      <informations-group :label="'Utilisateurs trouvés (' + searchedUsers.length + ')'"></informations-group>
      <console-user-searched v-for="user in searchedUsers" :user="user"></console-user-searched>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import InformationsGroup from "../../Elements/Inputs/InformationsGroup.vue";
import ConsoleUserSearched from "./User/UserSearched.vue";

export default Vue.extend({
  name: "console-users-searched-layout",
  components: {
    ConsoleUserSearched,
    InformationsGroup
  },
  computed: {
    ...mapState('console', ['currentLayout', 'searchedUsers']),
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";

.friends-lists {
  max-height: 408px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-right: 5px;
  margin-top: 12px;
  padding-left: 10px;
  margin-left: -10px;
  width: calc(100% + 10px);

  .informations-group {
    margin-bottom: 0;

    &.margin-top {
      margin-top: 10px;
    }
  }
}

.buttons {
  margin-top: 12px;
  transition: 200ms ease-in-out all;

  &.disabled {
    opacity: 0.5;
    filter: grayscale(100%);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 999;
    }
  }
}
</style>