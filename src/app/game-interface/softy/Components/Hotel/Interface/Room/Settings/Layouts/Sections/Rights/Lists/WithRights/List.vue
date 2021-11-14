<template>
  <div class="group">
    <div class="users">
      <remove-rights-user v-for="user in usersHasRights" :user="user"></remove-rights-user>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RemoveRightsUser from "./User/RemoveRights.vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: "users-with-rights-list",
  computed: {
    ...mapState('roomSettings', ['usersHasRights']),
  },
  components: {
    RemoveRightsUser
  }
});
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 12px 0;
}
</style>