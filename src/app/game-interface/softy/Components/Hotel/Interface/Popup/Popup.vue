<template>
  <elements-draggable-box class="popup">
    <span slot="title">{{ alert.title }}</span>
    <div class="body" slot="body">
      <span>{{ alert.body }}</span>
      <modules-button @click="closeBox" color="#65af64" text="Ok ! Fermer cette fenêtre"></modules-button>
    </div>
  </elements-draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsDraggableBox from "../Elements/Box/DraggableBox.vue";
import {Popup} from "../../../../../../core/logic/notification/Popup";
import ModulesButton from "../Elements/Buttons/Fat/IconButton.vue";

export default Vue.extend({
  name: 'popup',
  props: {
    alert: Popup
  },
  components: {
    ModulesButton,
    ElementsDraggableBox,
  },
  methods: {
    closeBox(): void {
      this.$store.commit('popupAlert/removeAlert', this.alert.index);
    },
  },
});
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  width: 350px;

  .body {
    padding: 0 15px 15px 15px;

    span {
      float: left;
      width: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
