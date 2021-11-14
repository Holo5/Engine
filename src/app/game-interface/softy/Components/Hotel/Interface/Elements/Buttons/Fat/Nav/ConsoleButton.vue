<template>
  <fat-button
      :class="['button-bounce', { bounce }]"
      color="#9180ff"
      :indicator="requestsUsersUnduplicated.length"
      :opacify="false"
      @click.native="toggleConsole()"
  >
    <div class="hoverable-button" slot="body">
      <div class="state" ref="button"></div>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../FatButton.vue';
import {mapGetters, mapState} from "vuex";

export default Vue.extend({
  name: 'elements-buttons-fat-nav-console',
  computed: {
    ...mapState('console', ['consoleDisplayed']),
    ...mapGetters('console', ['requestsUsersUnduplicated']),
  },
  components: {
    FatButton,
  },
  methods: {
    toggleConsole() {
      this.$store.commit('console/setConsoleDisplayed', !this.consoleDisplayed);
    },
  },
  data: () => ({
    bounce: false,
  }),
  watch: {
    requestsUsers(newValue, oldValue) {
      if (newValue > 0) {
        this.bounce = true;

        setTimeout(() => {
          this.bounce = false;
        }, 2000);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.button-bounce.bounce {
  animation: 1s ease-in-out bounce;
}

.state {
  height: 42px;
  width: 43px;
  margin-top: -2px;
  margin-left: 10px;
  background-image: url('~/app/game-interface/softy/assets/images/navbar/console.sprite.png');
  background-repeat: no-repeat;
  animation: close steps(4) 280ms forwards;

  &:hover {
    animation: open steps(4) 280ms forwards;
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
