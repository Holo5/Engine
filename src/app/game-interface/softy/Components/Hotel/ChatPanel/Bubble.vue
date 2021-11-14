<template>
  <div :class="['bubble', bubbleClass, { 'whisper': bubble.bubble.whisper }, { 'animated': ready }]" :style="topLeftStyle">
    <div class="avatar-part"></div>
    <div class="content">
      <span class="override-color" :style="'color: #' + bubble.bubble.textColor">
        <b v-if="bubble.bubble.unitName !== ''" class="override-color" :style="'color: #' + bubble.bubble.textColor">{{ bubble.bubble.unitName }}:</b>
        {{ bubble.bubble.unitMessage }}
      </span>
    </div>
    <div class="right-corner"></div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {mapState} from "vuex";
import {Bubble} from "../../../../../store/modules/game/Chat/ChatPanelStore";

export default Vue.extend({
  name: 'bubble-base',
  props: {
    bubble: {
      type: Object as PropType<Bubble>,
    },
  },
  data: () => ({
    ready: false,
  }),
  computed: {
    ...mapState('chatPanel', ['bubbles']),
    topLeftStyle() {
      return {
        'top': `${this.bubble.top}px`,
        'left': `${this.bubble.left}px`,
      };
    },
    bubbleClass() {
      return this.bubble.bubble.bubbleStyle.asset;
    },
  },
  mounted() {
    this.bubble.left -= this.$el.clientWidth / 2;

    if (this.$el.clientWidth + this.bubble.left > this.bubble.parentWidth) {
      this.bubble.left = this.bubble.parentWidth - this.$el.clientWidth;
    }

    if (this.bubble.left < 0) {
      this.bubble.left = 0;
    }

    this.bubble.rect = this.getRect();

    this.upEveryBubbles();
    this.checkForUp();
  },
  methods: {
    up() {
      this.bubble.rect = this.getRect();
      this.bubble.top -= this.bubble.rect.height;

      if (this.bubble.top < -this.bubble.rect.height) {
        this.$emit('outside-of-bounds');
      }
    },
    upEveryBubbles() {
      this.$store.dispatch('chatPanel/upEveryBubble', this.bubble);
    },
    checkForUp() {
      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        let bubble = this.bubbles[i];

        if (bubble.id !== this.bubble.id) {
          if (
              bubble.top === this.bubble.top &&
              this.bubble.rect.x < bubble.rect.x + bubble.rect.width &&
              this.bubble.rect.x + this.bubble.rect.width > bubble.rect.x &&
              this.bubble.rect.y < bubble.rect.y + bubble.rect.height &&
              this.bubble.rect.height + this.bubble.rect.y > bubble.rect.y
          ) {
            this.upEveryBubbles();

            break;
          }
        }
      }
    },
    getRect() {
      return {
        x: this.bubble.left,
        y: this.bubble.top,
        width: this.$el.clientWidth,
        height: this.$el.clientHeight
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../../assets/sass/chat-bubbles';

.bubble {
  position: absolute;
  display: flex;
  flex-direction: row;
  transition: top 0.2s ease-in;

  .avatar-part {
    background-position: top left;
  }

  .content {
    background-position: center right;
    padding-left: 5px;
    white-space: nowrap;

    span {
      font-size: 13px;

      b {
        font-weight: 600;
        font-size: 12px;
      }
    }
  }

  &.whisper .content span {
    opacity: 0.6;
    font-style: italic;
  }

  @include assign-chat-bubble-style;
}
</style>
