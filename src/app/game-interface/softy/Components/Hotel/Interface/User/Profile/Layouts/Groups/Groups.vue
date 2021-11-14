<template>
  <div class="user-profile-groups">
    <informations-group v-if="profile.totalGroups > 0" :label="'Groupes auxquels j\'appartient (' + profile.totalGroups + ')'"></informations-group>
    <informations-group v-if="profile.totalGroups === 0" :label="'Tu ne fais partie d\'aucun Groupe'"></informations-group>
    <div v-if="profile.totalGroups === 0" class="no-group">
      <img src="../../../../../../../assets/images/profile/no-group.png">
    </div>
    <div v-if="profile.totalGroups > 0" class="groups-down">
      <div class="groups-slider">
        <user-profile-groups-group-badge v-for="group in profile.groups" :key="group.id" :group-badge="group"></user-profile-groups-group-badge>
        <div :class="['group-empty', { all: profile.totalGroups === 0 }]" v-for="i in emptyGroupsBloc" :key="'empty' + i"></div>
      </div>
      <div class="group-display">
        <user-profile-group-display></user-profile-group-display>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import InformationsGroup from "../../../../Elements/Inputs/InformationsGroup.vue";
import UserProfileGroupsGroupBadge from "./GroupBadge.vue";
import UserProfileGroupDisplay from "./GroupDisplay.vue";

export default Vue.extend({
  name: 'user-profile-groups',
  components: {
    UserProfileGroupDisplay,
    UserProfileGroupsGroupBadge,
    InformationsGroup
  },
  computed: {
    ...mapState('profile', ['profile']),
    emptyGroupsBloc() {
      return 4 - this.profile.totalGroups <= 0 ? 0 : 4 - this.profile.totalGroups;
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.user-profile-groups {
  width: 100%;
  height: 278px;
  background-color: darken($winter, 4);
  border-radius: $medium-border-radius;
  padding: 15px;
  display: flex;
  flex-direction: column;

  .informations-group {
    margin-bottom: 1px;
    flex: 1;
    width: 100%;
  }

  .no-group {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .2;
  }

  .groups-down {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .groups-slider {
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      height: 227px;
      width: 65px;
      flex: 1;

      .group-empty {
        display: flex;
        border: 2px solid $grey-light-light;
        border-radius: $medium-border-radius;
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        margin-top: 9px;
        opacity: .3;

        &.all {
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }

    .group-display {
      background-color: $winter;
      width: calc(100% - 65px - 15px);
      margin-left: 15px;
      border-radius: $medium-border-radius;
      padding: 13px 15px;
    }
  }
}
</style>
