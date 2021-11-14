<template>
  <draggable-box class="doorbell-denied" v-if="accessDeniedDisplayed">
    <span slot="title">Accès refusé</span>
    <div slot="body" class="content">
      <div class="top">
        <b>{{ roomName }}</b>
        <p>Il semble que personne n'ai voulu t'ouvrir...</p>
      </div>
      <div class="buttons">
        <modules-button text="Retourner sur la vue aérienne" color="#c53131" @click.native="closeBox"></modules-button>
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
  name: 'doorbell-denied',
  components: {
    ModulesButton,
    DraggableBox
  },
  computed: {
    ...mapState('doorbell', ['accessDeniedDisplayed', 'roomName']),
  },
  methods: {
    closeBox() {
      this.$store.commit('doorbell/setAccessDenied', false);
    },
  },
});
</script>

<style lang="scss" scoped>
.doorbell-denied {
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
