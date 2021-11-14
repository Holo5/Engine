<template>
  <div :class="['user-profile-groups-group', { selected: selectedGroup, fav: groupBadge.favorite }]" @click="view">
    <div class="group-image">
      <img :src="groupImage" :alt="groupBadge.title">
    </div>
    <div class="group-is-favorite" v-if="groupBadge.favorite"></div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Group} from "../../../../../../../../../core/logic/profile/Group";
import {Configuration} from "../../../../../../../../../../conf";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'user-profile-groups-group-badge',
  props: {
    groupBadge: Object as PropType<Group>,
  },
  computed: {
    ...mapState('profile', ['group']),
    groupImage() {
      return Configuration.images.groupDomain + this.groupBadge.badge + '.gif';
    },
    selectedGroup() {
      return this.group === null ? false : this.group.id === this.groupBadge.id;
    }
  },
  methods: {
    view() {
      this.$store.dispatch('profile/viewGroup', this.groupBadge.id);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";
@import "../../../../../../../assets/sass/mixins";

.user-profile-groups-group {
  display: flex;
  flex-direction: row;
  border: 2px solid $grey-light-light;
  border-radius: $medium-border-radius;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  padding-top: 2px;

  &.selected {
    border: 2px solid $grey-light;
  }

  .group-is-favorite {
    position: absolute;
    right: -3px;
    top: -3px;

    @include itf-icon(15px, 13px, -233px, -162px);
  }

  &:not(:first-child) {
    margin-top: 9px;
  }
}
</style>