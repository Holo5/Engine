<template>
  <div class="console-friend">
    <div class="user-infos">
      <friend-figure-checkbox :figure="friend.figure" @updateCheckedValue="updateChecked"></friend-figure-checkbox>
      <span @click="openProfile">{{ friend.username }}</span>
    </div>
    <div class="buttons">
      <small-icon-button icon="message" v-tooltip.top="'Laisser un message'" iconType="transparent" color="#999" hover-color="#4c78d8" @click.native="message"></small-icon-button>
      <small-icon-button icon="follow" v-if="friend.isInRoom && friend.isOnline" v-tooltip.top="'Rejoindre'" iconType="transparent" color="#999" hover-color="#9180ff" @click.native="follow"></small-icon-button>
<!--      <small-icon-button icon="cog" v-tooltip.top="'Modifier l\'amitié'" iconType="transparent" color="#999" hover-color="#9180ff" @click.native="friendSettings"></small-icon-button>-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Friend} from "../../../../../../../../core/logic/console/Friend";
import ButtonsSmallFigure from "../../../Elements/Buttons/Small/FigureButton.vue";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";
import FatButton from "../../../Elements/Buttons/Fat/FatButton.vue";
import FriendFigureCheckbox from "./FigureCheckbox.vue";

export default Vue.extend({
  name: "console-friend",
  components: {
    FriendFigureCheckbox,
    FatButton,
    SmallIconButton,
    ButtonsSmallFigure,
  },
  props: {
    friend: Friend,
  },
  methods: {
    openProfile() {
      this.$store.dispatch('profile/viewProfile', this.friend.id);
    },
    updateChecked(checked: boolean) {
      this.$emit('updateChecked', { checked, friend: this.friend });
    },
    message() {
      this.$store.dispatch('messenger/createDiscussion', this.friend.id);
    },
    follow() {
      this.$store.dispatch('console/followFriend', this.friend.id);
    },
    friendSettings() {
      // TODO: friend settings (relation, remove, ...)
    },
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
