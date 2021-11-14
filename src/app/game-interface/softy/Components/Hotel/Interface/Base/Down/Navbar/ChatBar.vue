<template>
  <div class="chat-bar">
    <bubble-selector></bubble-selector>
    <input :class="{ isFlood }" :disabled="isFlood" type="text" ref="chatbar" v-model="messageModel" :placeholder="placeholder" @keyup="submit" maxlength="100"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import BubbleSelector from "../BubbleSelector/BubbleSelector.vue";

export default Vue.extend({
  name: 'elements-chat-bar',
  components: {
    BubbleSelector,
  },
  computed: {
    ...mapState('chatBar', ['flood', 'message', 'tempMessage']),
    isFlood() {
      return this.flood > 0;
    },
    placeholder() {
      return this.isFlood ? `Eh oh molo l'asticot. ${this.flood} secondes de flood.` : 'Clique ici pour discuter...';
    },
    messageModel: {
      get() {
        return this.message;
      },
      set(message: string) {
        this.$store.commit('chatBar/setMessage', message);
      }
    }
  },
  mounted() {
    this.$root.$on('focus-chatbar', () => (this.$refs.chatbar as HTMLInputElement).focus());
  },
  watch: {
    isFlood(newIsFlood) {
      if (newIsFlood) {
        this.$store.commit('chatBar/setTempMessage', this.message);
        this.$store.commit('chatBar/setMessage', '');
      } else {
        this.$store.commit('chatBar/setMessage', this.tempMessage);
        this.$store.commit('chatBar/setTempMessage', '');
      }
    }
  },
  methods: {
    submit(event: KeyboardEvent) {
      if (event.key == 'Enter' && this.message.length > 0) {
        this.$store.dispatch('chatBar/sendChat');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/mixins";

.chat-bar {
  background-color: #a3a3a3;
  border-radius: $medium-border-radius;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    background-color: $white;
    border-radius: $medium-border-radius;
    width: 300px;
    height: 35px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 16px;

    &.isFlood {
      &::placeholder {
        color: $red;
      }
    }
  }
}
</style>
