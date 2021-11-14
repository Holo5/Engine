<template>
  <div class="general-layout">
    <room-name></room-name>
    <room-description></room-description>
    <room-category></room-category>
    <div class="double-group">
      <users-max></users-max>
      <allow-walkthrough></allow-walkthrough>
    </div>
    <trade-state></trade-state>
    <settings-section-delete-room></settings-section-delete-room>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ModulesButton from "../../../Elements/Buttons/Fat/IconButton.vue";
import RoomName from "./Sections/General/RoomName.vue";
import RoomDescription from "./Sections/General/RoomDescription.vue";
import RoomCategory from "./Sections/General/RoomCategory.vue";
import UsersMax from "./Sections/General/UsersMax.vue";
import AllowWalkthrough from "./Sections/General/AllowWalkthrough.vue";
import TradeState from "./Sections/General/TradeState.vue";
import SettingsSectionDeleteRoom from "./Sections/General/DeleteRoom.vue";

export default Vue.extend({
  name: "room-settings-layout-general",
  components: {
    SettingsSectionDeleteRoom,
    TradeState,
    AllowWalkthrough,
    UsersMax,
    RoomCategory,
    RoomDescription,
    RoomName,
    ModulesButton,
  },
});
</script>

<style lang="scss" scoped>
.general-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>