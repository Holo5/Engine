<template>
  <div class="friends-list">
    <messenger-list-arrow direction="up"></messenger-list-arrow>
    <div class="list">
      <messenger-list-friend v-for="(friend, index) in discussionsFriendsList" :key="index" :friendIndex="index" :friend="friend"></messenger-list-friend>
      <messenger-list-friend-empty v-for="n in emptyCases"></messenger-list-friend-empty>
    </div>
    <messenger-list-arrow direction="down"></messenger-list-arrow>
    <messenger-list-create-discussion></messenger-list-create-discussion>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from "vuex";
import MessengerListFriend from "./Friends/Friend.vue";
import MessengerListFriendEmpty from "./Friends/FriendEmpty.vue";
import MessengerListArrow from "./Friends/Arrow.vue";
import MessengerListCreateDiscussion from "./Friends/CreateDiscussion.vue";

export default Vue.extend({
  name: 'messenger-list',
  components: {
    MessengerListCreateDiscussion,
    MessengerListArrow,
    MessengerListFriendEmpty,
    MessengerListFriend,
  },
  computed: {
    ...mapGetters('messenger', ['discussionsFriendsList']),
    emptyCases() {
      return this.maxUsersShowed - this.discussionsFriendsList.length <= 0 ? 0 : this.maxUsersShowed - this.discussionsFriendsList.length;
    },
  },
  data: () => ({
    maxUsersShowed: 5,
  }),
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/mixins";

.friends-list {
  $left: (56px + 10px * 2) / 2;

  margin-left: -#{$left};
  background-color: $grey-light;
  border-radius: $big-border-radius;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  align-items: flex-start;

  .list {
    max-height: 320px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px 0;
  }
}
</style>
