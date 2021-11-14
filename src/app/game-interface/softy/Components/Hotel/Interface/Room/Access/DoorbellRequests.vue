<template>
  <draggable-box class="doorbell-requests" v-if="requestsDisplayed">
    <span slot="title">Dring dring...</span>
    <div class="body-content" slot="body">
      <span class="subtitle">Des joueurs demandent à entrer</span>
      <div class="players">
        <doorbell-user v-for="username in usersRinging" :username="username"></doorbell-user>
      </div>
      <div class="down-buttons">
        <modules-button :text="'Refuser ' + usersRinging.length" icon="key" color="#c53131" @click.native="declineAllRequests"></modules-button>
        <modules-button :text="'Accepter ' + usersRinging.length" icon="key-opened" @click.native="acceptAllRequests"></modules-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import ModulesButton from '../../Elements/Buttons/Fat/IconButton.vue';
import DoorbellUser from './DoorbellRequest/User.vue';
import {mapState} from 'vuex';
import {LetUserInComposer} from "../../../../../../../core/network/packets/outgoing/room/access/LetUserInComposer";

export default Vue.extend({
  name: 'doorbell-requests',
  components: {
    DoorbellUser,
    ModulesButton,
    DraggableBox
  },
  computed: {
    ...mapState('doorbell', ['requestsDisplayed', 'usersRinging']),
  },
  methods: {
    closeBox() {
      this.declineAllRequests();
    },
    acceptAllRequests() {
      this.usersRinging.forEach((username: string) => {
        this.$store.dispatch('doorbell/letUserIn', username);
      });
    },
    declineAllRequests() {
      this.usersRinging.forEach((username: string) => {
        this.$store.dispatch('doorbell/declineUserIn', username);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.doorbell-requests {
  top: 60px;
  left: 20px;
  width: 310px;

  .body-content {
    padding: 0 15px 15px 15px;
    display: flex;
    flex-direction: column;

    span.subtitle {
      font-size: 13px;
      color: #666;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 7px;
      width: 100%;
    }

    .players {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .down-buttons {
      display: flex;
      flex-direction: row;
      margin-left: -10px;
      width: calc(100% + 10px);
      margin-top: 5px;

      .button {
        margin-left: 10px;

        &:first-child {
          width: 90%;
        }
      }
    }
  }
}
</style>
