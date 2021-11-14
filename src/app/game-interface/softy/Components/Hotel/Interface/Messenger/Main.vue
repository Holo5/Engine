<template>
  <draggable-box class="hotel-box-messenger" v-if="messengerDisplayed">
    <span slot="title">Messagerie</span>
    <div slot="body" class="content">
      <messenger-list></messenger-list>
      <messenger-discussion></messenger-discussion>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import DraggableBox from '../Elements/Box/DraggableBox.vue';
import MessengerList from './List.vue';
import MessengerDiscussion from './Discussion/Discussion.vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'messenger-main',
  components: {
    DraggableBox,
    MessengerList,
    MessengerDiscussion
  },
  computed: {
    ...mapState('messenger', ['messengerDisplayed']),
  },
  methods: {
    closeBox(): void {
      this.$store.commit('messenger/setMessengerDisplayed', false);
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-messenger {
  width: 350px;
  top: 50px;
  left: 90px;

  .box-body {
    .content {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
