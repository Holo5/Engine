<template>
  <div class="room" v-if="roomData && canSeeCurrentRoom">
    <grey-box class="current-room hidden" v-if="hidden" :icon="'plus'">
      <div slot="title" class="title">
        <h1>{{ roomData.name }}</h1>
      </div>
    </grey-box>
    <grey-box class="current-room" v-else :icon="'minus'">
      <div slot="title" class="title">
        <h1>{{ roomData.name }}</h1>
        <h2>Chez {{ roomData.ownerName }}</h2>
      </div>
      <div slot="body" class="body">
        <div class="buttons">
          <div class="top">
            <fat-text :icon="'message'" :text="'Historique'" :color="'#3c90e6'" @click.native="toggleChatHistory"></fat-text>
            <fat-text :icon="'room'" :text="'Plus d\'infos'" :color="'#65af64'" @click.native="toggleRoomInfos"></fat-text>
          </div>
          <div class="down">
            <fat-button :icon="'home'" v-tooltip.top="'Définir comme point de spawn'"></fat-button>
            <fat-button :icon="'thumbsup'" v-tooltip.top="'Aimer l\'appart'"></fat-button>
            <fat-button :icon="'flag'" v-tooltip.top="'Signaler'"></fat-button>
          </div>
        </div>
      </div>
    </grey-box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GreyBox from '../../../Elements/Box/GreyBox.vue';
import FatButton from '../../../Elements/Buttons/Fat/FatButton.vue';
import FatText from '../../../Elements/Buttons/Fat/TextButton.vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'current-room-box',
  components: {
    FatText,
    FatButton,
    GreyBox
  },
  computed: {
    ...mapState('navigator', ['canSeeCurrentRoom']),
    ...mapState('room', ['roomData']),
  },
  data: () => ({
    hidden: false
  }),
  methods: {
    close() {
      this.hidden = !this.hidden;
    },
    toggleRoomInfos() {
      this.$store.commit('navigator/toggleRoomInformations');
    },
    toggleChatHistory() {
      this.$store.commit('chatHistory/toggleChatHistory');
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.room {
  display: flex;
  align-self: flex-end;

  .current-room {
    height: 100%;

    &.hidden {
      padding-top: 18px;
      padding-bottom: 18px;

      .title {
        margin-bottom: 0;
      }
    }

    .title {
      h1 {
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        color: $winter;
      }

      h2 {
        color: $winter;
        line-height: 1.4;
        font-size: 13px;
        font-weight: normal;
      }
    }

    .body {
      .top {
        .fat-button {
          margin-bottom: 10px;
        }
      }

      .down {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 -5px;

        .fat-button {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
