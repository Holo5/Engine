<template>
  <div :class="['friend', { highlighted }]" @click="openDiscuss" v-tooltip.right="friend.username" ref="friend">
    <transition name="fade">
      <span class="count" v-if="messagesUnviewed > 0">
        {{ messagesUnviewed }}
      </span>
    </transition>
    <holo-figure :figure="friend.figure" :headonly="true"></holo-figure>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters, mapState} from "vuex";
import HoloFigure from '../../Elements/Figure.vue';
import {Friend} from "../../../../../../../core/logic/console/Friend";
import {Discussion} from "../../../../../../../core/logic/messenger/Discussion";

export default Vue.extend({
  name: "messenger-list-friend",
  components: {
    HoloFigure,
  },
  computed: {
    ...mapState('messenger', ['discussions', 'currentDiscussionIndex']),
    ...mapGetters('messenger', ['currentDiscussion']),
    highlighted() {
      return this.currentDiscussion.user.id === this.friend.id;
    },
    messagesUnviewed() {
      return this.discussions.filter((discussion: Discussion) => discussion.user.id === this.friend.id)[0].messagesUnviewed();
    },
  },
  props: {
    friend: Friend,
    friendIndex: Number,
  },
  watch: {
    currentDiscussionIndex(newValue, oldValue) {
      const blocsUp = newValue - 4; // 4 = 5 - 1 // 5 = blocs visibles
      const friendHeight = 58; // bloc height
      const marginBetween = 5; // margin between blocs
      let finalUp = 0;

      if (this.friendIndex === 0) {
        if (newValue >= 5) {
          finalUp = blocsUp * (friendHeight + marginBetween);
        }

        this.$refs.friend.style.marginTop = `-${finalUp}px`;
      }
    },
  },
  methods: {
    openDiscuss() {
      this.$store.dispatch('messenger/displayDiscuss', this.friendIndex);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.friend {
  z-index: 8;
  margin: 5px 10px 0 10px;
  width: 56px;
  height: 58px;
  border-radius: $medium-border-radius;
  transition: 200ms ease-in-out background-color, 50ms ease-in-out margin-top;
  cursor: pointer;
  background-color: rgba($winter, 0.1);

  &:first-child {
    margin-top: 0;
  }

  &.highlighted {
    background-color: rgba($winter, 0.5);
  }

  .count {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 3px;
    left: 3px;
    background-color: $blue;
    border-radius: 50%;
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    font-weight: bold;
    z-index: 9;
    color: $white;
  }

  img {
    z-index: 8;
    margin-left: 4px;
    filter: drop-shadow(0 0 10px rgba($black, 0.5));
  }
}
</style>
