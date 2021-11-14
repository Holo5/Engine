<template>
  <transition name="slide">
    <div class="room-details-container" v-if="chatHistoryDisplayed">
      <div class="room-details-chatlogs">
        <div class="title">
          <span>Historique</span>
          <elements-icon-button :icon="'close'" :opacity="0.9" :type="'square'" :theme="'light'" @click.native="close"></elements-icon-button>
        </div>
        <chatlogs-messages></chatlogs-messages>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsIconButton from '../../../Elements/Buttons/Small/IconButton.vue';
import {mapState} from 'vuex';
import ChatlogsMessages from './Chatlogs/Messages.vue';

export default Vue.extend({
  name: 'room-infos-chatlogs',
  components: {
    ChatlogsMessages,
    ElementsIconButton
  },
  computed: {
    ...mapState('chatHistory', ['chatHistoryDisplayed']),
  },
  methods: {
    close() {
      this.$store.commit('chatHistory/toggleChatHistory');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.room-details-container {
  display: flex;
  height: 100%;
  position: relative;
  z-index: -1;

  .room-details-chatlogs {
    width: 210px;
    background: linear-gradient(180deg, #24568a 0%, #2d6baa 100%);
    border-radius: $medium-border-radius $medium-border-radius 0 0;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
    padding: 15px 15px 27px 15px;
    pointer-events: auto;
    position: absolute;
    top: 0;
    bottom: -15px;
    display: flex;
    flex-direction: column;

    .title {
      margin-bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      span {
        font-size: 22px;
        line-height: 16px;
        font-weight: bold;
        letter-spacing: -1px;
        color: $white;
      }
    }
  }
}
</style>
