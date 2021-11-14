<template>
  <div class="console-friend">
    <div class="user-infos">
      <friend-figure-checkbox :figure="amigo.figure" @updateCheckedValue="updateChecked"></friend-figure-checkbox>
      <span>{{ amigo.username }}</span>
    </div>
    <div class="buttons">
      <small-icon-button iconType="transparent" icon="small-close" color="#c53131" @click.native="decline" v-tooltip="'Refuser'"></small-icon-button>
      <small-icon-button iconType="transparent" icon="tick" @click.native="accept" v-tooltip="'Accepter'"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonsSmallFigure from "../../../Elements/Buttons/Small/FigureButton.vue";
import FatButton from "../../../Elements/Buttons/Fat/FatButton.vue";
import FriendFigureCheckbox from "./FigureCheckbox.vue";
import {RequestUser} from "../../../../../../../../core/logic/console/RequestUser";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";

export default Vue.extend({
  name: "console-friend-request",
  components: {
    SmallIconButton,
    FriendFigureCheckbox,
    FatButton,
    ButtonsSmallFigure,
  },
  props: {
    amigo: RequestUser,
  },
  methods: {
    updateChecked(checked: boolean) {
      this.$emit('updateChecked', { checked, amigo: this.amigo });
    },
    accept() {
      const usersId = [this.amigo.id];

      this.$store.dispatch('console/acceptFriendRequests', usersId);
    },
    decline() {
      const userId = this.amigo.id;

      this.$store.dispatch('console/declineFriendRequests', userId);
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
