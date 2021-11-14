<template>
  <div :class="['scroll-arrow', direction]" @click="updateScroll">
    <div class="icon"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: "messenger-list-arrow",
  computed: {
    ...mapState('messenger', ['discussions', 'currentDiscussionIndex']),
  },
  props: {
    direction: String,
    maxUsersShowed: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    updateScroll() {
      if (this.direction === 'up' && this.currentDiscussionIndex > 0) {
        this.$store.dispatch('messenger/displayDiscuss', this.currentDiscussionIndex - 1);
      }

      if (this.direction === 'down' && this.currentDiscussionIndex < this.discussions.length - 1) {
        this.$store.dispatch('messenger/displayDiscuss', this.currentDiscussionIndex + 1);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.scroll-arrow {
  height: 25px;
  width: 56px;
  margin: 0 10px 0 10px;
  background-color: rgba($winter, 0.4);
  border-radius: $medium-border-radius - 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9;

  .icon {
    @include itf-icon(16px, 6px, -48px, 0px);

    transition: 200ms ease-in-out opacity;
    opacity: 0.4;
  }

  &.down {
    .icon {
      transform: rotate(-180deg);
    }
  }

  &:hover .icon {
    opacity: 0.3;
  }
}
</style>