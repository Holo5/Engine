<template>
  <div class="user-line">
    <div class="user">
      <span>{{ username }}</span>
    </div>
    <div class="buttons">
      <small-icon-button icon="small-close" color="#c53131" @click.native="declineUserIn"></small-icon-button>
      <small-icon-button icon="tick" @click.native="letUserIn"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SmallIconButton from '../../../Elements/Buttons/Fat/SmallIconButton.vue';
import {LetUserInComposer} from "../../../../../../../../core/network/packets/outgoing/room/access/LetUserInComposer";

export default Vue.extend({
  name: 'doorbell-requests-user',
  components: {
    SmallIconButton,
  },
  props: {
    username: String,
  },
  methods: {
    letUserIn() {
      this.$store.dispatch('doorbell/letUserIn', this.username);
    },
    declineUserIn() {
      this.$store.dispatch('doorbell/declineUserIn', this.username);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";

.user-line {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: space-between;
  padding: 5px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      margin-left: 2px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;

    ::v-deep .small-icon-button {
      margin-left: 5px;
      min-height: 28px !important;
      border-radius: $big-border-radius;

      .button {
        margin: 0 5px 0 5px;
      }
    }
  }
}
</style>
