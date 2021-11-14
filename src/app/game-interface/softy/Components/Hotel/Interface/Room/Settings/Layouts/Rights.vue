<template>
  <div class="rights-layout">
    <informations-group label="Attribuer des droits" text="Tu peux attribuer des droits sur ton appart à d’autres utilisateurs présents dans ta liste d’amis. "></informations-group>
    <assign-rights></assign-rights>
    <users-has-rights></users-has-rights>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../Elements/Inputs/InformationsGroup.vue";
import UsersHasRights from "./Sections/Rights/UsersHasRights.vue";
import AssignRights from "./Sections/Rights/AssignRights.vue";

export default Vue.extend({
  name: "room-settings-layout-rights",
  components: {
    AssignRights,
    UsersHasRights,
    InformationsGroup
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.rights-layout {
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
    .z#{$z} {
      z-index: $z;
    }
  }
}
</style>