<template>
  <div class="bubble-selector" @click="toggle">
    <transition name="slide">
      <div class="bubbles-table" v-if="bubbleSelectorMenuDisplayed">
        <div class="bubble-row" v-for="bubble in bubbles">
          <bubble :bubble="bubble"></bubble>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import {ChatStyles} from "../../../../../../../../core/logic/chat/ChatStyles";
import Bubble from "./Bubble.vue";
import {IStyle} from "../../../../../../../../core/logic/chat/interfaces/IStyle";

export default Vue.extend({
  name: 'bubble-selector',
  components: {
    Bubble,
  },
  computed: {
    ...mapState('chatBar', ['bubbleSelectorMenuDisplayed']),
    ...mapState('clientData', ['clubState', 'rank', 'ambassador']),
    bubbles() {
      return ChatStyles.getForSelection(this.clubState.active, this.rank, this.ambassador).reverse();
    }
  },
  methods: {
    toggle() {
      this.$store.commit('chatBar/toggleBubbleSelectorMenu');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/mixins";
@import "../../../../../../assets/sass/colors";
@import '../../../../../../assets/sass/chat-bubbles';

.bubble-selector {
  @include itf-icon(17px, 19px, -93px, -87px);

  margin: 0 10px;
  cursor: pointer;

  .bubbles-table {
    @include blur-background;

    position: absolute;
    left: -10px;
    bottom: 52px;
    display: flex;
    flex-direction: row;
    background-color: $white;
    border-radius: $big-border-radius;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
    flex-wrap: wrap;
    width: 200px;
    padding: 10px 10px 0 0;

    .bubble-row {
      width: 33.333333%;

      ::v-deep .bubble {
        @include assign-chat-bubble-style;
      }
    }
  }
}
</style>
