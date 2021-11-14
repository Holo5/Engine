<template>
  <div id="chat-panel" :style="heightStyle">
    <bubble-base v-for="bubble in bubbles" v-if="bubble.top > -60" :bubble="bubble"></bubble-base>
  </div>
</template>

<script lang="ts">
import {mapState} from 'vuex';
import BubbleBase from "./Bubble.vue";

export default {
  name: 'ChatPanel',
  components: {
    BubbleBase,
  },
  mounted() {
    this.$store.commit('chatPanel/setPanelWidth', this.$el.clientWidth);
  },
  computed: {
    ...mapState('chatPanel', ['panelHeight', 'bubbles']),
    heightStyle() {
      return {
        'height': `${this.panelHeight}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#chat-panel {
  position: fixed;
  display: flex;
  width: 100%;
  pointer-events: none;
}
</style>