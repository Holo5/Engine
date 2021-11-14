<template>
  <div class="discussion" @click="focusDiscussion">
    <messenger-discussion-header></messenger-discussion-header>
    <div class="discuss no-smooth-scroll" ref="discussion" v-if="currentDiscussion.messages">
      <messenger-discussion-message v-for="(message, i) in messages" :key="i" :message="message" :sameAuthor="sameAuthor(i)"></messenger-discussion-message>
    </div>
    <messenger-write @onsend="scrollDown"></messenger-write>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessengerWrite from './Write.vue';
import MessengerDiscussionHeader from "./Header.vue";
import {mapGetters} from "vuex";
import MessengerDiscussionMessage from "./Message.vue";

export default Vue.extend({
  name: 'messenger-discussion',
  components: {
    MessengerDiscussionMessage,
    MessengerDiscussionHeader,
    MessengerWrite
  },
  computed: {
    ...mapGetters('messenger', ['currentDiscussion']),
    messages() {
      return this.currentDiscussion.messages;
    }
  },
  beforeUpdate() {
    this.focusDiscussion();
  },
  beforeMount() {
    this.focusDiscussion();
  },
  watch: {
    messages() {
      setTimeout(() => this.scrollDown(), 100);
    },
  },
  methods: {
    sameAuthor(index: number) {
      if (!this.currentDiscussion.messages[index + 1]) {
        return false;
      }

      return this.currentDiscussion.messages[index].userId === this.currentDiscussion.messages[index + 1].userId;
    },
    focusDiscussion() {
      if (this.currentDiscussion) {
        this.$store.dispatch('messenger/setDiscussionAsViewed', this.currentDiscussion);
        this.$store.commit('messenger/focusWriteInput');
      }
    },
    scrollDown() {
      const elementHeight = this.$refs.discussion.scrollHeight;
      const scrollToOptions: ScrollToOptions = {
        top: elementHeight
      };

      this.$refs.discussion.scrollTo(scrollToOptions);
    },
  },
});
</script>

<style lang="scss" scoped>
.discussion {
  padding: 1px 15px 15px 15px;
  width: 100%;

  .discuss {
    width: 100%;
    height: 350px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 15px;
    padding-right: 15px;
  }
}
</style>
