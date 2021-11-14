<template>
  <modules-button class="btn" text="Supprimer définitivement cet appart" color="#c53131" @click.native="deleteRoom"></modules-button>
</template>

<script lang="ts">
import Vue from "vue";
import ModulesButton from "../../../../../Elements/Buttons/Fat/IconButton.vue";

export default Vue.extend({
  name: "settings-section-delete-room",
  components: {
    ModulesButton,
  },
  methods: {
    deleteRoom() {
      this.$store.commit('roomSettings/setRoomDeletionConfirmDisplayed', true);
    },
  },
});
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 12px;
}
</style>