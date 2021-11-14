<template>
  <div id="main">
    <canvas-zone></canvas-zone>
    <chat-panel></chat-panel>
    <div class="top-right">
      <user-wallet></user-wallet>
      <notifications></notifications>
    </div>
    <div class="draggable-main">
      <messenger @mousedown.native="incrementZ('messenger')" ref="messenger"></messenger>
      <shop @mousedown.native="incrementZ('shop')" ref="shop"></shop>
      <navigator @mousedown.native="incrementZ('navigator')" ref="navigator"></navigator>
      <inventory @mousedown.native="incrementZ('inventory')" ref="inventory"></inventory>
      <console @mousedown.native="incrementZ('console')" ref="console"></console>
      <user-profile @mousedown.native="incrementZ('user-profile')" ref="user-profile"></user-profile>

      <group-message-write class="megaZ" ref="group-message-write"></group-message-write>

      <navigator-room-details class="megaZ" ref="navigator-details"></navigator-room-details>
      <navigator-room-knock class="megaZ" ref="navigator-knock"></navigator-room-knock>
      <navigator-room-password class="megaZ" ref="navigator-password"></navigator-room-password>

      <create-room class="megaZ" ref="navigator-room-creation"></create-room>

      <room-info class="megaZ" ref="room-informations"></room-info>
      <room-settings class="megaZ" ref="room-settings"></room-settings>
      <confirm-room-deletion class="megaZ" ref="confirm-room-deletion"></confirm-room-deletion>

      <doorbell-requests class="megaZ" ref="doorbell-requests"></doorbell-requests>
      <doorbell-pending class="megaZ" ref="doorbell-pending"></doorbell-pending>
      <doorbell-denied class="megaZ" ref="doorbell-denied"></doorbell-denied>

      <popups class="megaZ" ref="popups"></popups>
      <news-box class="megaZ"></news-box>

    </div>
    <down></down>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CanvasZone from './Canvas/CanvasZone.vue';
import UserWallet from './Interface/User/Wallet/Main.vue';
import Notifications from './Interface/Notifications/Main.vue';
import Messenger from './Interface/Messenger/Main.vue';
import Shop from './Interface/Shop/Main.vue';
import Navigator from './Interface/Navigator/Main.vue';
import NavigatorRoomDetails from './Interface/Navigator/BeforeEnter/RoomDetails.vue';
import NavigatorRoomKnock from './Interface/Navigator/BeforeEnter/RoomKnock.vue';
import NavigatorRoomPassword from './Interface/Navigator/BeforeEnter/RoomPassword.vue';
import Down from './Interface/Base/Down/Main.vue';
import Inventory from './Interface/Inventory/Main.vue';
import CreateRoom from './Interface/Room/Create/Main.vue';
import RoomInfo from './Interface/Room/RoomInfos/Informations.vue';
import DoorbellPending from './Interface/Room/Access/DoorbellPending.vue';
import DoorbellRequests from './Interface/Room/Access/DoorbellRequests.vue';
import DoorbellDenied from './Interface/Room/Access/DoorbellDenied.vue';
import RoomSettings from "./Interface/Room/Settings/Main.vue";
import ConfirmRoomDeletion from "./Interface/Room/Settings/Layouts/Sections/General/DeleteRoom/Popup.vue";
import Console from "./Interface/Console/Main.vue";
import GroupMessageWrite from "./Interface/Messenger/GroupMessage/Main.vue";
import Popups from "./Interface/Popup/Main.vue";
import ChatPanel from "./ChatPanel/ChatPanel.vue";
import UserProfile from "./Interface/User/Profile/Profile.vue";
import NewsBox from './Interface/News/NewsBox.vue';

export default Vue.extend({
  name: 'base-main',
  components: {
    UserProfile,
    CanvasZone,
    ChatPanel,
    Popups,
    GroupMessageWrite,
    Console,
    ConfirmRoomDeletion,
    RoomSettings,
    DoorbellDenied,
    DoorbellRequests,
    DoorbellPending,
    RoomInfo,
    CreateRoom,
    Inventory,
    UserWallet,
    Notifications,
    Messenger,
    Shop,
    Navigator,
    NavigatorRoomDetails,
    NavigatorRoomKnock,
    NavigatorRoomPassword,
    Down,
    NewsBox
  },
  data: () => ({
    maxZ: 99,
  }),
  methods: {
    incrementZ(ref: string): void {
      const element = (this.$refs[ref] as any).$el;

      if (element.style.zIndex != this.maxZ) {
        element.style.zIndex = this.maxZ++;
      }
    },
  }
});
</script>

<style lang="scss" scoped>
@import "../../assets/sass/colors";

#main {
  .top-right {
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 9;
  }

  .draggable-main {
    position: fixed;
    z-index: 8;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;

    .megaZ {
      z-index: 99999999999;
    }
  }
}
</style>
