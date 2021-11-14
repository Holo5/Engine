<template>
  <div class="console-friend">
    <div class="user-infos">
      <buttons-small-figure class="user-figure" color="#9180ff" :figure="user.figure"></buttons-small-figure>
      <span @click="viewProfile">{{ user.username }}{{ user.isMe ? ' (moi)' : '' }}</span>
    </div>
    <div class="buttons" v-if="!user.isMe">
      <small-icon-button v-if="isMyFriend" icon="message" v-tooltip.top="'Laisser un message'" iconType="transparent" color="#4c78d8" @click.native="message"></small-icon-button>
      <small-icon-button v-if="canFollow" icon="follow" v-tooltip.top="'Rejoindre'" iconType="transparent" color="#9180ff" @click.native="follow"></small-icon-button>
      <small-icon-button v-if="canAskAsFriend" icon="add-user" v-tooltip.top="'Demander en ami'" iconType="transparent" color="#65af64" @click.native="addAsFriend"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonsSmallFigure from "../../../Elements/Buttons/Small/FigureButton.vue";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";
import FatButton from "../../../Elements/Buttons/Fat/FatButton.vue";
import {SearchedUser} from "../../../../../../../../core/logic/console/SearchedUser";
import {mapState} from "vuex";
import {Friend} from "../../../../../../../../core/logic/console/Friend";

export default Vue.extend({
  name: "console-user-searched",
  components: {
    FatButton,
    SmallIconButton,
    ButtonsSmallFigure,
  },
  computed: {
    ...mapState('console', ['friends', 'friendRequestsSent']),
    isMyFriend() {
      return this.friends.find((friend: Friend) => friend.id === this.user.id);
    },
    canFollow() {
      if (this.isMyFriend) {
        return this.friends.filter((f: Friend) => f.id === this.user.id)[0].isInRoom;
      }

      return false;
    },
    canAskAsFriend() {
      if (!this.isMyFriend) {
        return !this.friendRequestsSent.includes(this.user.username);
      }

      return false;
    },
  },
  props: {
    user: SearchedUser,
  },
  methods: {
    message() {
      this.$store.dispatch('messenger/createDiscussion', this.user.id);
    },
    addAsFriend() {
      this.$store.dispatch('console/newFriendRequest', this.user.username);
    },
    follow() {
      // TODO: follow user
    },
    viewProfile() {
      this.$store.dispatch('profile/viewProfile', this.user.id);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.console-friend {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #dedede;
  border-radius: $medium-border-radius;
  margin-top: 5px;
  background-color: transparent;
  transition: 150ms ease-in-out background-color;
  cursor: pointer;
  padding-right: 7px;
  height: 38px;

  &:hover,
  &.checked {
    background-color: #dedede;
  }

  .user-infos {
    display: flex;
    flex-direction: row;
    margin: -1px;
    align-items: center;

    span {
      margin-left: 9px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;

    ::v-deep .small-icon-button {
      margin-left: 3px;
      min-height: 22px !important;
      border-radius: $big-border-radius;
      box-shadow: none;

      .button {
        margin: 0 2px 0 2px;
      }
    }
  }
}
</style>
