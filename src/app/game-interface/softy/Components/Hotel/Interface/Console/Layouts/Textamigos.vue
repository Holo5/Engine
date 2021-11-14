<template>
  <div class="layout friends" v-show="currentLayout === 'textamigos'">
    <div class="friends-lists">
      <informations-group :label="'Textamigos reçus (' + requestsUsersUnduplicated.length + ')'"></informations-group>
      <console-friend-request v-for="amigo in requestsUsersUnduplicated" :amigo="amigo" @updateChecked="updateChecked"></console-friend-request>
    </div>
    <div :class="['buttons', { disabled }]">
      <modules-button color="#c53131" :text="'Refuser tous'" @click.native="declineSelected"></modules-button>
      <modules-button class="disablable" color="#65af64" :text="'Accepter (' + this.amigosSelected.length + ')'" @click.native="acceptSelected"></modules-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters, mapState} from "vuex";
import InformationsGroup from "../../Elements/Inputs/InformationsGroup.vue";
import ModulesButton from "../../Elements/Buttons/Fat/IconButton.vue";
import ConsoleFriendRequest from "./User/FriendRequest.vue";
import {RequestUser} from "../../../../../../../core/logic/console/RequestUser";

export default Vue.extend({
  name: "console-textamigos-layout",
  components: {
    ConsoleFriendRequest,
    ModulesButton,
    InformationsGroup
  },
  computed: {
    ...mapState('console', ['currentLayout']),
    ...mapGetters('console', ['requestsUsersUnduplicated']),
    disabled() {
      return this.amigosSelected.length <= 0;
    },
  },
  data: () => ({
    amigosSelected: [],
  }),
  methods: {
    updateChecked(args: { checked: boolean, amigo: RequestUser }) {
      if (args.checked && !this.amigosSelected.includes(args.amigo)) {
        this.amigosSelected.push(args.amigo);
      } else {
        this.amigosSelected = this.amigosSelected.filter((amigo: RequestUser) => amigo.id !== args.amigo.id);
      }
    },
    declineSelected() {
      this.$store.dispatch('console/declineAllFriendRequests');
    },
    acceptSelected() {
      const usersId: number[] = [];

      this.amigosSelected.forEach((amigo: RequestUser) => {
        usersId.push(amigo.id);
      });

      if (usersId.length > 0) {
        this.$store.dispatch('console/acceptFriendRequests', usersId);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";

.layout.friends {
  .friends-lists {
    max-height: 365px;
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
    display: flex;
    flex-direction: row;
    width: calc(100% + 12px);
    margin-left: -12px;

    &.disabled {
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 999;
      }

      .disablable {
        opacity: 0.5;
        filter: grayscale(100%);
      }
    }

    ::v-deep .button {
      margin-left: 12px;
    }
  }
}
</style>
