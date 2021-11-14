<template>
  <elements-draggable-box class="user-profile" v-if="profilePopupDisplayed">
    <span class="header" slot="title">
      Profil de {{ profile.username }}
    </span>
    <div class="body" slot="body">
      <div class="user-profile-relationships">
        <user-profile-plate></user-profile-plate>
        <user-profile-badges></user-profile-badges>
      </div>
      <div class="profile-body-down-section">
        <user-relationships-list></user-relationships-list>
        <user-profile-groups></user-profile-groups>
      </div>
    </div>
  </elements-draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsDraggableBox from "../../Elements/Box/DraggableBox.vue";
import {mapState} from "vuex";
import BadgeSlotted from "../../Inventory/Layouts/Badges/List/SlottedBadge.vue";
import UserProfileBadges from "./Layouts/Badges/Badges.vue";
import UserProfileGroups from "./Layouts/Groups/Groups.vue";
import UserProfilePlate from "./Layouts/Plate.vue";
import UserRelationshipsList from "./Layouts/Relationship/RelationshipsList.vue";

export default Vue.extend({
  name: 'user-profile',
  components: {
    UserRelationshipsList,
    UserProfilePlate,
    UserProfileGroups,
    UserProfileBadges,
    BadgeSlotted,
    ElementsDraggableBox,
  },
  computed: {
    ...mapState('profile', ['profilePopupDisplayed', 'profile']),
  },
  methods: {
    closeBox() {
      this.$store.dispatch('profile/hideProfile');
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.user-profile {
  width: 550px;
  height: 572px;
  left: calc(50% - 550px / 2);
  top: calc(50% - 599px / 2);

  .body {
    .user-profile-relationships {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    .profile-body-down-section {
      padding: 0 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
