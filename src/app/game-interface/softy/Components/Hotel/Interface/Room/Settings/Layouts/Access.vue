<template>
  <div class="access-layout">
    <informations-group label="Accès à l'appart" text="Ouvert signifie que tout le monde peut entrer; Fermé permet d'entrer uniquement avec un code; Privé signifie que les joueurs doivent sonner et attendre qu'on leur ouvre."></informations-group>
    <informations-group label="Accéder à cet appart"></informations-group>
    <access-type></access-type>
    <room-password></room-password>
    <allow-pets></allow-pets>
    <allow-pets-eat></allow-pets-eat>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../Elements/Inputs/InformationsGroup.vue";
import AccessType from "./Sections/Access/AccessType.vue";
import RoomPassword from "./Sections/Access/RoomPassword.vue";
import AllowPets from "./Sections/Access/AllowPets.vue";
import AllowPetsEat from "./Sections/Access/AllowPetsEat.vue";

export default Vue.extend({
  name: "room-settings-layout-access",
  components: {
    AllowPetsEat,
    AllowPets,
    RoomPassword,
    AccessType,
    InformationsGroup
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.access-layout {
  width: 100%;
  display: flex;
  flex-direction: column;

  .maxiZ {
    z-index: 99999;
  }

  .double-group {
    display: flex;
    z-index: auto;
    flex-direction: row;
    margin-left: -12px;
    width: calc(100% + 12px);
    margin-top: 0;

    .group {
      margin-left: 12px;
    }
  }
}
</style>