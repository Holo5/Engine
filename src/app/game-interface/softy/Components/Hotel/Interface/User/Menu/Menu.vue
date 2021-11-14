<template>
  <div>
    <transition name="slide">
      <div class="user-menu" v-if="userMenuShowed">
        <div class="bloc navigation">
          <icon-button @click.native="toggleSettings" :icon="'settings'" :text="'Paramètres'" :color="'#d89976'" :animation="false"></icon-button>
          <icon-button @click.native="toggleUserProfile" :icon="'profile'" :text="'Mon profil'" :color="'#63c3c9'" :animation="false"></icon-button>
          <icon-button @click.native="toggleActionsEffects" :icon="'actions-and-effects'" :text="'Actions & effets'" :color="'#666'" :animation="false"></icon-button>
          <icon-button @click.native="toggleFigureEditor" :icon="'clothes'" :text="'Changer de look'" :color="'#9e8ad8'" :animation="false"></icon-button>
        </div>
        <transition-group name="slide-right" class="subnav">
          <user-menu-actions-effects :key="'um-actions-effects'" v-show="userMenuActionsEffectsShowed"></user-menu-actions-effects>
          <user-menu-dances :key="'um-dances'" v-show="userMenuActionsEffectsShowed"></user-menu-dances>
          <user-menu-signs :key="'um-signs'" v-show="userMenuActionsEffectsShowed"></user-menu-signs>
        </transition-group>
      </div>
    </transition>
    <fat-button-figure figure="hd-3095-1.ch-265-82.lg-3235-96.sh-3275-1416.ha-3426-110.hr-3531-61.he-1601.ea-3169.fa-3472.cp-3310.cc-3007.ca-1809.wa-2007" @click.native="toggleUserMenu"></fat-button-figure>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButtonFigure from '../../Elements/Buttons/Fat/FigureButton.vue';
import UserMenuActionsEffects from './Elements/ActionsEffects.vue';
import IconButton from '../../Elements/Buttons/Fat/IconButton.vue';
import UserMenuDances from './Elements/Dances.vue';
import UserMenuSigns from './Elements/Sign.vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'user-menu',
  components: {
    UserMenuSigns,
    UserMenuDances,
    UserMenuActionsEffects,
    FatButtonFigure,
    IconButton
  },
  data: () => ({
    userMenuShowed: false,
    userMenuActionsEffectsShowed: false,
  }),
  computed: {
    ...mapState('clientData', ['userId'])
  },
  methods: {
    toggleUserMenu() {
      this.userMenuShowed = !this.userMenuShowed;
    },
    toggleActionsEffects() {
      this.userMenuActionsEffectsShowed = !this.userMenuActionsEffectsShowed;
    },
    toggleSettings() {
      // TODO: toggle settings
    },
    toggleUserProfile() {
      this.$store.dispatch('profile/viewProfile', this.userId);
      this.userMenuShowed = !this.userMenuShowed;
    },
    toggleFigureEditor() {
      // TODO: toggle user figure editor
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.user-menu {
  @include blur-background;

  position: absolute;
  left: -10px;
  bottom: 60px;
  display: flex;
  flex-direction: row;

  ::v-deep .button {
    padding-right: 18px;
  }

  .bloc {
    background-color: $white;
    border-radius: $big-border-radius;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
    padding: 0 10px 10px 10px;

    &.sub {
      margin-left: -$big-border-radius;
      border-radius: 0 $big-border-radius $big-border-radius 0;
      padding: 0 10px 10px #{$big-border-radius + 10px};
    }

    &.navigation {
      flex-direction: column;
      white-space: nowrap;

      .button {
        margin-top: 10px;
      }
    }
  }

  .subnav {
    z-index: -1;
    display: flex;
    flex-direction: row;
  }
}
</style>
