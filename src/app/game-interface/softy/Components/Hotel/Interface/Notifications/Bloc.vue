<template>
  <transition name="list">
    <div id="notification-bloc" v-if="showed">
      <div class="top">
        <h1>{{ notification.title }}</h1>
        <icon-button :type="'square'" :opacity="100" :theme="'light'" :icon="'close'" @click.native="close"></icon-button>
      </div>
      <div class="body">
        <p v-html="notification.message"></p>
        <!-- <element-button v-if="room" :room="room" :body="'Aller dans l\'appart'" :color="'white'" :opacity="80"></element-button> -->
        <!-- <element-button v-if="url" :url="url" :body="'Visiter le lien'" :color="'white'" :opacity="80"></element-button> -->
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import IconButton from '../Elements/Buttons/Small/IconButton.vue';
import ElementButton from '../Elements/Buttons/Fat/BasicButton.vue';

export default Vue.extend({
  name: 'notifications-bloc',
  components: {
    IconButton,
    ElementButton
  },
  props: {
    notification: Object,
  },
  data: () => ({
    showed: true,
  }),
  computed: {
    room(): number | boolean {
      return typeof this.notification.room == 'number' ? this.notification.room : false;
    },
    url(): string | boolean {
      return typeof this.notification.url == 'string' ? this.notification.url : false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.close();
    }, 5000);
  },
  methods: {
    close(): void {
      this.showed = false;

      setTimeout(() => this.$destroy(), 500);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/mixins";

#notification-bloc {
  @include blur-background;

  width: 100%;
  margin-top: 15px;
  background-color: rgba($grey, 0.9);
  border-radius: $big-border-radius;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 15px;

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      max-width: 155px;
      letter-spacing: -0.5px;
      color: $winter;
    }
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px 0 0 0;

    p,
    p ::v-deep i {
      color: $winter;
      line-height: 1.4;
      font-size: 13px;
    }

    &::v-deep .button {
      margin-top: 12px;
      color: $grey;
      font-weight: bold;
      letter-spacing: -0.8px;
    }
  }
}
</style>
