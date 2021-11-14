<template>
  <draggable-box class="hotel-box-navigator" v-show="navigatorDisplayed">
    <span slot="title">Navigateur</span>
    <div slot="body" class="content">
      <search-bar></search-bar>
      <navigation></navigation>
      <div class="rooms">
        <rooms v-for="roomCategory in roomCategories" :room-category="roomCategory"></rooms>
      </div>
      <div class="buttons">
        <icon-button text="Vue aérienne" color="#22abd6" icon="leave"></icon-button>
        <icon-button class="create" text="Créer un appart" icon="create-room" @click.native="startRoomCreation"></icon-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../Elements/Box/DraggableBox.vue';
import SearchBar from './SearchBar.vue';
import Navigation from './Navigation.vue';
import Rooms from './Rooms.vue';
import IconButton from '../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'navigator-main',
  components: {
    DraggableBox,
    SearchBar,
    Navigation,
    Rooms,
    IconButton
  },
  data: () => ({
    currentCategory: 'official_view'
  }),
  computed: {
    ...mapState('navigator', ['roomCategories', 'navigatorDisplayed']),
  },
  methods: {
    closeBox(): void {
      this.$store.commit('navigator/close');
    },
    startRoomCreation(): void {
      this.$store.dispatch('roomCreation/start');
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-navigator {
  width: 490px;
  top: 110px;
  left: 150px;

  .box-body {
    .content {
      padding: 0 15px 15px 15px;

      .rooms {
        height: 459px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 15px;
        padding-right: 5px;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        justify-content: space-between;

        .create {
          margin-left: 15px;
          width: 120%;
        }
      }
    }
  }
}
</style>
