<template>
  <div class="user-profile-badges-slot">
    <div class="badges">
      <badge-slotted v-for="badge in profile.badges" :badge="badge"></badge-slotted>
      <div class="badge disabled" v-for="i in 5 - badgesCount"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import BadgeSlotted from "./BadgeSlotted.vue";

export default Vue.extend({
  name: 'user-profile-badges',
  computed: {
    ...mapState('profile', ['profile']),
    badgesCount() {
      return this.profile.badges === null ? 0 : this.profile.badges.length;
    },
  },
  components: {
    BadgeSlotted,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.user-profile-badges-slot {
  width: 150px;
  height: 219px;
  background: linear-gradient(180deg, lighten($salmon, 18) 0%, $salmon 100%);
  border-radius: $medium-border-radius;
  transition: 150ms ease-in-out all;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 15px;
  flex-shrink: 0;

  .badges {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 18px;
    margin-top: 9px;
    margin-right: 4px;

    .badge {
      border: 2px solid #fff;
      border-radius: $medium-border-radius;
      width: 52px;
      height: 54px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 10px;

      &:nth-child(2) {
        margin-top: 40px;
      }

      &:nth-child(3),
      &:nth-child(5), {
        margin-top: -20px;
      }

      &.disabled {
        background-image: url('../../../../../../../assets/images/profile/no-badge.png');
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0.5;
      }
    }
  }
}
</style>
