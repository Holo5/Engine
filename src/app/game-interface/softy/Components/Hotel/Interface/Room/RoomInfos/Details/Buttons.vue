<template>
  <div class="down-button">
    <span class="button-copy" @click="copyURL" v-tooltip="'Clique sur moi pour me copier'">{{ roomURL }}</span>
    <small-icon-button icon="cog" :text="'Paramètes de l\'appart'" v-if="isAdmin" @click.native="displayRoomSettings"></small-icon-button>
    <div class="double">
      <small-icon-button icon="cog" color="#a3a3a3" :text="'Filtre'" v-if="isAdmin"></small-icon-button>
      <small-icon-button icon="cog" color="#a3a3a3" :text="'Éditer le floor'" v-if="isAdmin"></small-icon-button>
    </div>
    <small-icon-button icon="plus" color="#a3a3a3" :text="'Ajout au choix des staff'" v-if="isAdmin"></small-icon-button>
    <small-icon-button icon="minus" color="#c53131" :text="'Rendre les visiteurs muets'" v-if="isAdmin || isModerator"></small-icon-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SmallIconButton from '../../../Elements/Buttons/Fat/SmallIconButton.vue';
import {mapGetters, mapState} from 'vuex';

export default Vue.extend({
  name: 'room-infos-buttons',
  components: {
    SmallIconButton,
  },
  computed: {
    ...mapState('room', ['roomData', 'role']),
    roomURL() {
      return 'https://habbocity.me/room/' + this.roomData.roomId;
    },
    isAdmin() {
      return this.role == 'owner';
    },
    isModerator() {
      return this.role == 'moderator';
    },
  },
  methods: {
    copyURL() {
      navigator.clipboard.writeText(this.roomURL);
    },
    displayRoomSettings() {
      this.$store.commit('navigator/toggleRoomInformations');
      this.$store.dispatch('roomSettings/loadRoomSettingsData', this.roomData.roomId, { root: true });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.down-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;

  .double {
    display: flex;
    flex-direction: row;
    width: calc(100% + 10px);
    margin-left: -10px;

    .small-icon-button {
      &:first-child {
        width: 65%;
      }

      margin-left: 10px;
    }
  }

  .small-icon-button,
  .button-copy {
    margin-top: 10px;
  }

  .button-copy {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    border-radius: $medium-border-radius;
    line-height: 38px;
    padding: 0 15px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
}
</style>
