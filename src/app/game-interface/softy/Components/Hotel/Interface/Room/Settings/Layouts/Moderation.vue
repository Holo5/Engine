<template>
  <div class="advanced-layout">
    <informations-group label="Paramètres de modération" text="Choisis les options de modération que tu désires pour cet appart :"></informations-group>
    <mute-state class="z-index-999"></mute-state>
    <kick-state class="z-index-998"></kick-state>
    <ban-state class="z-index-997"></ban-state>
    <!-- ban user z996 -->
    <users-banned class="z-index-995"></users-banned>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../Elements/Inputs/InformationsGroup.vue";
import MuteState from "./Sections/Moderation/MuteState.vue";
import KickState from "./Sections/Moderation/KickState.vue";
import BanState from "./Sections/Moderation/BanState.vue";
import UsersBanned from "./Sections/Moderation/UsersBanned.vue";

export default Vue.extend({
  name: "room-settings-layout-moderation",
  components: {
    UsersBanned,
    BanState,
    KickState,
    MuteState,
    InformationsGroup
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.advanced-layout {
  width: 100%;
  display: flex;
  flex-direction: column;

  .double-group {
    display: flex;
    flex-direction: row;
    margin-left: -12px;
    width: calc(100% + 12px);
    margin-top: 0;

    .group {
      margin-left: 12px;
    }
  }

  @each $z in (999, 998, 997, 996, 995, 994) {
    .z-index-#{$z} {
      z-index: $z;
    }
  }
}
</style>