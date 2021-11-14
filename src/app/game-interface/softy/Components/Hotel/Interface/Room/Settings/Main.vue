<template>
  <draggable-box class="room-settings" v-if="roomSettingsDisplayed && roomSettingsDataLoaded">
    <span slot="title">Paramètres de l'appart</span>
    <div slot="body" class="content">
      <top-navigation></top-navigation>
      <div class="layouts">
        <div class="layout" v-for="item in navigationItems">
          <component :is="item.layout" v-if="categoryDisplayed.name === item.name"></component>
        </div>
        <modules-button text="Enregistrer les modifications" @click.native="save" class="save-button"></modules-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from "vue";
import DraggableBox from "../../Elements/Box/DraggableBox.vue";
import { mapState } from "vuex";
import TopNavigation from "./Navigation.vue";
import LayoutGeneral from "./Layouts/General.vue";
import LayoutAccess from "./Layouts/Access.vue";
import LayoutRights from "./Layouts/Rights.vue";
import LayoutAdvanced from "./Layouts/Advanced.vue";
import LayoutModeration from "./Layouts/Moderation.vue";
import ModulesButton from "../../Elements/Buttons/Fat/IconButton.vue";

export default Vue.extend({
  name: "room-settings",
  computed: {
    ...mapState('roomSettings', ['roomSettingsDisplayed', 'roomSettingsDataLoaded', 'navigationItems', 'categoryDisplayed']),
  },
  components: {
    ModulesButton,
    LayoutGeneral,
    LayoutAccess,
    LayoutRights,
    LayoutAdvanced,
    LayoutModeration,
    TopNavigation,
    DraggableBox,
  },
  methods: {
    closeBox() {
      this.$store.commit('roomSettings/hideRoomSettings');
    },
    save() {
      this.$store.dispatch('roomSettings/saveRoomSettings');
    },
  },
});
</script>

<style lang="scss" scoped>
.room-settings {
  top: 60px;
  left: 50px;
  max-width: 418px;

  .layouts {
    width: 100%;
    padding: 0 15px 15px 15px;
  }

  .save-button {
    z-index: -1;
  }
}
</style>