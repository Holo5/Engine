<template>
  <div class="message-discussion-header">
    <span class="who">{{ friend.username }} <b>+ toi</b></span>
    <div class="actions">
      <button class="view-profile" @click="profile" v-tooltip.bottom="'Profil de ' + friend.username"></button>
      <button class="follow" @click="follow" v-tooltip.bottom="'Rejoindre'" v-if="friend.isInRoom"></button>
      <button class="trash" @click="trash" v-tooltip.bottom="'Supprimer la conversation'"></button>
      <button class="report" @click="report" v-tooltip.bottom="'Reporter ' + friend.username"></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Friend} from "../../../../../../../core/logic/console/Friend";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "messenger-discussion-header",
  computed: {
    ...mapGetters('messenger', ['currentDiscussion']),
    friend() {
      return this.currentDiscussion.user;
    }
  },
  methods: {
    profile() {
      this.$store.dispatch('profile/viewProfile', this.friend.id);
    },
    follow() {
      this.$store.dispatch('console/followFriend', this.friend.id);
    },
    trash() {
      this.$store.dispatch('messenger/removeDiscussion', this.friend.id);
    },
    report() {
      this.$store.dispatch('messenger/reportDiscussion', this.friend.id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.message-discussion-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  span.who {
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: $grey;
    letter-spacing: -0.8px;

    b {
      font-size: 16px;
      font-weight: bold;
      line-height: 18px;
      color: $blue;
      letter-spacing: -0.8px;
    }
  }

  .actions {
    display: flex;
    flex-direction: row;

    button {
      opacity: 0.5;
      transition: 200ms ease-in-out opacity;
      margin-left: 5px;

      &:hover {
        opacity: 0.4;
      }

      &.follow {
        @include itf-icon(11px, 16px, -289px, -138px);

        margin: 2px 3px 2px 8px;
      }

      &.view-profile {
        @include itf-icon(24px, 20px, -40px, -36px);
      }

      &.trash {
        @include itf-icon(18px, 20px, -21px, -36px);
      }

      &.report {
        @include itf-icon(20px, 20px, 0, -36px);
      }
    }
  }
}
</style>
