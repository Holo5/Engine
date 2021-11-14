<template>
  <div :class="['bubble', bubble.asset]" @click="select">
    <div class="avatar-part"></div>
    <div class="content"></div>
    <div class="right-corner"></div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {IStyle} from "../../../../../../../../core/logic/chat/interfaces/IStyle";

export default Vue.extend({
  name: 'bubble',
  props: {
    bubble: {
        type: Object as PropType<IStyle>,
    },
  },
  methods: {
    select() {
      this.$store.commit('chatBar/setBubble', this.bubble.id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.bubble {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 10px 10px;
  align-items: center;
  height: 30px;
  border-radius: $medium-border-radius;
  transition: 150ms ease-in-out all;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }

  &.avatar-part {
    width: 40px !important;
  }

  .content {
    position: absolute;
    z-index: -1;
    left: 10px;
    right: 10px;
    background-position: center left;
  }

  .right-corner {
    width: 20px !important;
  }
}
</style>
