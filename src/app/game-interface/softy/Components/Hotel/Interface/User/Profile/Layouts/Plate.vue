<template>
  <user-profile-plate-common>
    <div class="spans" slot="spans">
      <user-profile-span :text="profile.motto"></user-profile-span>
      <user-profile-span :text="online ? 'En ligne' : 'Hors ligne'" :state="true" :state-color="online ? 'green' : 'red'"></user-profile-span>
      <user-profile-span :text="'Inscrit depuis le ' + profile.registerDate"></user-profile-span>
      <user-profile-span :text="profile.friendsCount + ' amis'"></user-profile-span>
    </div>
  </user-profile-plate-common>
</template>

<script lang="ts">
import Vue from 'vue';
import HoloFigure from '../../../Elements/Figure.vue';
import UserProfilePlateCommon from "../Common/Profile.vue";
import UserProfileSpan from "../Common/Span.vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'user-profile-plate',
  components: {
    UserProfileSpan,
    UserProfilePlateCommon,
    HoloFigure
  },
  computed: {
    ...mapState('profile', ['profile']),
    online(): boolean {
      return this.profile.isOnline;
    }
  },
});
</script>
