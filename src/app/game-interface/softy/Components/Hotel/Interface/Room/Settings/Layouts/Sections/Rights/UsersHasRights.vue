<template>
  <div class="group">
    <informations-group :label="'Utilisateurs acrédités (' + totalUsersWithRights + ')'" text="Voici la liste des utilisateurs étant acrédités dans cet appartement. Clique sur la croix à côté pour supprimer les droits de l'utilisateur."></informations-group>
    <users-with-rights-list v-if="totalUsersWithRights > 0"></users-with-rights-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../../../Elements/Inputs/InformationsGroup.vue";
import {mapState} from "vuex";
import UsersWithRightsList from "./Lists/WithRights/List.vue";

export default Vue.extend({
  name: "users-has-rights",
  components: {
    UsersWithRightsList,
    InformationsGroup
  },
  computed: {
    ...mapState('roomSettings', ['usersHasRights', 'roomSettingsData']),
    totalUsersWithRights() {
      return this.usersHasRights ? this.usersHasRights.length : 0;
    },
  },
  mounted() {
    this.$store.dispatch('roomSettings/getUsersWithRights', this.roomSettingsData.id);
  },
});
</script>