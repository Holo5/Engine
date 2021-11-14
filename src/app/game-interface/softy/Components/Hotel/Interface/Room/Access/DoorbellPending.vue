<template>
  <draggable-box class="doorbell-pending" v-if="pendingDisplayed">
    <span slot="title">Sonnette</span>
    <div slot="body" class="content">
      <div class="top">
        <b>{{ roomName }}</b>
        <p>Tu as sonné, quelqu'un va ouvrir...</p>
      </div>
      <div class="buttons">
        <modules-button text="Abandonner" color="#c53131" @click.native="cancel"></modules-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import ModulesButton from '../../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'doorbell-pending',
  components: {
    ModulesButton,
    DraggableBox
  },
  computed: {
    ...mapState('doorbell', ['pendingDisplayed', 'roomName']),
  },
  methods: {
    closeBox() {
      this.cancel();
    },
    cancel() {
      this.$store.dispatch('doorbell/cancelPending');
    },
  },
});
</script>

<style lang="scss" scoped>
.doorbell-pending {
  top: 80px;
  left: 30px;
  width: 330px;

  .content {
    padding: 0 15px 15px 15px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
      width: 100%;

      b {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
</style>
