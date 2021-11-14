<template>
  <div class="navbar">
    <user-menu></user-menu>
    <fat-navigator-button></fat-navigator-button>
    <fat-shop-button></fat-shop-button>
    <fat-inventory-button v-if="isInRoom"></fat-inventory-button>
    <chat-bar v-if="isInRoom"></chat-bar>
    <fat-messenger-button v-if="hasDiscussionsOpened"></fat-messenger-button>
    <fat-console-button></fat-console-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HoloFigure from '../../Elements/Figure.vue';
import ChatBar from './Navbar/ChatBar.vue';
import FatNavigatorButton from '../../Elements/Buttons/Fat/Nav/NavigatorButton.vue';
import FatInventoryButton from '../../Elements/Buttons/Fat/Nav/InventoryButton.vue';
import FatShopButton from '../../Elements/Buttons/Fat/Nav/ShopButton.vue';
import FatMessengerButton from '../../Elements/Buttons/Fat/Nav/MessengerButton.vue';
import FatConsoleButton from '../../Elements/Buttons/Fat/Nav/ConsoleButton.vue';
import UserMenu from '../../User/Menu/Menu.vue';
import {mapGetters, mapState} from "vuex";

export default Vue.extend({
  name: 'base-down-navbar',
  computed: {
    ...mapState('bottomBar', ['isInRoom']),
    ...mapGetters('messenger', ['hasDiscussionsOpened']),
  },
  components: {
    UserMenu,
    FatNavigatorButton,
    FatInventoryButton,
    FatShopButton,
    FatMessengerButton,
    FatConsoleButton,
    HoloFigure,
    ChatBar
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.navbar {
  @include blur-background;

  display: inline-flex;
  height: 55px;
  background-color: rgba($white, 0.9);
  border-radius: $big-border-radius;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
}

.fat-button,
.chat-bar {
  margin-left: 10px;
}
</style>
