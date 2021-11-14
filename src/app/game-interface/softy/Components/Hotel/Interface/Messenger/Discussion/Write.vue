<template>
  <form @submit.prevent="send" :class="['write', { shake, flood }]">
    <textarea
        ref="content"
        v-model="content"
        :placeholder="placeholder"
        @keypress="watchChanges($event)"
        :disabled="flood"
        @focusout="disableFocus"
        maxlength="120"
    ></textarea>
    <div class="submit-zone">
      <div class="icon"></div>
      <input type="submit" value="">
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters, mapState} from "vuex";

export default Vue.extend({
  name: 'messenger-write',
  computed: {
    ...mapGetters('messenger', ['currentDiscussion']),
    ...mapState('messenger', ['flood', 'writeMessageFocused']),
    placeholder() {
      return this.flood
          ? `Tu es mute, ${this.floodTime} secondes restantes.`
          : `Clique ici pour parler à ${this.currentDiscussion.user.username}`
    },
  },
  data: () => ({
    content: '',
    shake: false,
    floodTime: 10,
    floodTimer: null,
  }),
  watch: {
    flood(isFlood) {
      clearInterval(this.floorTimer);

      this.floodTimer = null;
      this.floodTime = 10;

      if (isFlood) {
        this.floodTimer = setInterval(() => {
          this.floodTime--;
        }, 1000);
      }
    },
    writeMessageFocused() {
      this.$refs.content.focus();
    }
  },
  methods: {
    disableFocus() {
      this.$store.commit('messenger/focusWriteInput', false);
    },
    watchChanges(event: KeyboardEvent) {
      const textarea = this.$refs.content as HTMLTextAreaElement;

      textarea.style.height = '38px';
      textarea.style.height = textarea.scrollHeight > 38 ? textarea.scrollHeight + 'px' : '38px';

      if ((event.keyCode || event.which) == 13 || event.key == 'enter') {
        this.send();
        event.preventDefault();
      }
    },
    send() {
      const contentLength = this.content.trim().length;

      if (contentLength <= 0 || this.flood) {
        this.shake = true;

        setTimeout(() => this.shake = false, 500);
      } else {
        this.$store.dispatch('messenger/addSentMessage', {
          userId: this.currentDiscussion.user.id,
          message: this.content,
        });

        this.content = '';
        this.$refs.content.style.height = '38px';
      }

      this.content = '';
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.write {
  border-radius: $medium-border-radius;
  background-color: $white;
  margin-top: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.flood {
    box-shadow: 0 0 25px rgba($red, 0.2);
    background-color: lighten($red, 48);
  }

  &.shake {
    animation: 250ms shake ease-in-out infinite;

    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }

      25%, 75% {
        transform: translateX(-5px);
      }

      50% {
        transform: translateX(5px);
      }
    }
  }

  textarea {
    width: calc(100% - 38px);
    resize: none;
    padding: 10px 0 8px 14px;
    line-height: 1.5;
    background: none;
    height: 38px;
    min-height: 38px;
    font-size: 13px;
    font-weight: 500;

    &::-webkit-input-placeholder {
      white-space: nowrap;
      overflow-x: hidden;
    }
  }

  .submit-zone {
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      @include itf-icon(18px, 18px, -65px, -36px);

      transition: 200ms ease-in-out opacity;
      opacity: 1;
    }

    &:hover .icon {
      opacity: 0.8;
    }

    input[type="submit"] {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
