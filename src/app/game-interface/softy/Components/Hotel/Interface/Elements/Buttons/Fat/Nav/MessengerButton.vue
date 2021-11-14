<template>
  <fat-button :class="['button-bounce', { bounce }]" color="#3c90e6" :indicator="messengerMessagesUnreaded" :opacify="false" @click.native="toggleMessenger()">
    <div class="hoverable-button" slot="body">
      <div class="state" ref="button"></div>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../FatButton.vue';
import {mapState} from "vuex";
import {Discussion} from "../../../../../../../../../core/logic/messenger/Discussion";

export default Vue.extend({
  name: 'elements-buttons-fat-nav-messenger',
  computed: {
    ...mapState('messenger', ['discussions']),
    messengerMessagesUnreaded() {
      let messagesUnread = 0;

      this.discussions.forEach((discussion: Discussion) => {
        messagesUnread += discussion.messagesUnviewed();
      });

      return messagesUnread;
    },
  },
  data: () => ({
    bounce: false,
  }),
  watch: {
    messengerMessagesUnreaded(newValue, oldValue) {
      if (newValue > 0) {
        this.bounce = true;

        setTimeout(() => {
          this.bounce = false;
        }, 2000);
      }
    },
  },
  components: {
    FatButton
  },
  methods: {
    toggleMessenger() {
      this.$store.dispatch('messenger/initMessenger');
    },
  },
});
</script>

<style lang="scss" scoped>
.button-bounce.bounce {
  animation: 1s ease-in-out bounce forwards;
}

.state {
  height: 40px;
  width: 40px;
  margin-top: -2px;
  margin-left: 10px;
  background-image: url('~/app/game-interface/softy/assets/images/navbar/messenger.sprite.png');
  background-repeat: no-repeat;
  animation: close steps(6) 280ms forwards;

  &:hover {
    animation: open steps(6) 280ms forwards;
  }
}

@keyframes bounce {
  0%, 20%, 40%, 100% {
    transform: translateY(0px);
  }

  10%, 30% {
    transform: translateY(-5px);
  }
}

@keyframes open {
  to {
    background-position: right 0;
  }
}

@keyframes close {
  from {
    background-position: right 0;
  }

  to {
    background-position: left 0;
  }
}
</style>
