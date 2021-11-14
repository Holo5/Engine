<template>
  <div class="hotel-shop-body">
    <left-navigation></left-navigation>
    <div class="layout">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LeftNavigation from './LeftNavigation.vue';

import LayoutBadgeDisplay from './Layouts/BadgeDisplay.vue';
import LayoutCreateGroup from './Layouts/CreateGroup.vue';
import LayoutCreateGroupForum from './Layouts/CreateGroupForum.vue';
import LayoutError from './Layouts/Error.vue';
import LayoutFrontpage from './Layouts/Frontpage.vue';
import LayoutIntroduction from './Layouts/Introduction.vue';
import LayoutItems from './Layouts/Items.vue';
import LayoutPromoteRoom from './Layouts/PromoteRoom.vue';
import LayoutTrophies from './Layouts/Trophies.vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'shop-body',
  components: {
    LeftNavigation,
    'shop-layout-badge-display': LayoutBadgeDisplay,
    'guild_frontpage': LayoutCreateGroup,
    'guild_forum': LayoutCreateGroupForum,
    'layout_error': LayoutError,
    'shop-layout-frontpage': LayoutFrontpage,
    'pets2': LayoutIntroduction,
    'default_3x3': LayoutItems,
    'shop-layout-promote-room': LayoutPromoteRoom,
    'shop-layout-trophies': LayoutTrophies,
  },
  computed: {
    ...mapState('catalog', ['actualPage']),
    currentComponent(): string {
      return this.actualPage.template ? this.actualPage.template : 'layout_error';
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-shop-body {
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .layout {
    width: calc(100% - 180px + 50px);
  }
}
</style>
