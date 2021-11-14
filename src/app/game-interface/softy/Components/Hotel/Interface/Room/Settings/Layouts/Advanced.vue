<template>
  <div class="advanced-layout">
    <informations-group label="Paramètres mur et sol" text="Personnalise tes sols et tes murs ! Tu peux choisir si tes murs seront visibles ou non, ainsi que l'épaisseur que peuvent avoir tes sols ou tes murs."></informations-group>
    <hide-walls></hide-walls>
    <wall-thickness class="z-index-999"></wall-thickness>
    <floor-thickness class="z-index-998"></floor-thickness>
    <informations-group label="Paramètres de tchat" text="Contrôle le défilement des bulles de tchat."></informations-group>
    <bubble-mode class="z-index-997"></bubble-mode>
    <div class="double-group z-index-996">
      <bubble-type class="left"></bubble-type>
      <bubble-scroll class="right"></bubble-scroll>
    </div>
    <anti-flood-settings class="z-index-995"></anti-flood-settings>
    <chat-distance></chat-distance>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../Elements/Inputs/InformationsGroup.vue";
import HideWalls from "./Sections/Advanced/HideWalls.vue";
import WallThickness from "./Sections/Advanced/WallThickness.vue";
import FloorThickness from "./Sections/Advanced/FloorThickness.vue";
import BubbleType from "./Sections/Advanced/BubbleType.vue";
import BubbleMode from "./Sections/Advanced/BubbleMode.vue";
import BubbleScroll from "./Sections/Advanced/BubbleScroll.vue";
import AntiFloodSettings from "./Sections/Advanced/AntiFlood.vue";
import ChatDistance from "./Sections/Advanced/ChatDistance.vue";

export default Vue.extend({
  name: "room-settings-layout-advanced",
  components: {
    ChatDistance,
    AntiFloodSettings,
    BubbleScroll,
    BubbleMode,
    BubbleType,
    FloorThickness,
    WallThickness,
    HideWalls,
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