<template>
  <div class="group">
    <div class="users">
      <give-rights-user v-for="friend in friendsFiltered" :friend="friend"></give-rights-user>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import GiveRightsUser from "./User/GiveRights.vue";
import {Friend} from "../../../../../../../../../../../../core/logic/console/Friend";

export default Vue.extend({
  name: "users-without-rights-list",
  props: {
    searchValue: String,
  },
  components: {
    GiveRightsUser,
  },
  data: () => ({
    friendsFiltered: [],
  }),
  computed: {
    ...mapState('console', ['friends']),
    ...mapState('roomSettings', ['usersHasRights']),
    idOfUsersWithRights() {
      const ids: number[] = [];

      this.usersHasRights.forEach((user: Friend) => ids.push(user.id));

      return ids;
    },
    allFriendsWithoutRights() {
      return this.friends.filter((friend: Friend) => !this.idOfUsersWithRights.includes(friend.id));
    },
  },
  watch: {
    allFriendsWithoutRights: {
      handler() {
        this.updateFriendsList(this.searchValue);
      },
      immediate: true,
    },
    searchValue: {
      handler(newValue) {
        this.updateFriendsList(newValue);
      },
      immediate: true,
    },
  },
  methods: {
    updateFriendsList(searchedValue: string) {
      if (searchedValue !== '') {
        this.friendsFiltered = this.allFriendsWithoutRights.filter((friend: Friend) => {
          return friend.username.toLowerCase().includes(searchedValue.toLowerCase());
        });
      } else {
        this.friendsFiltered = this.allFriendsWithoutRights;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: row;
  max-height: 118px;
  overflow-x: visible;
  overflow-y: scroll;
  flex-wrap: wrap;
  margin: 12px 0;
}
</style>
