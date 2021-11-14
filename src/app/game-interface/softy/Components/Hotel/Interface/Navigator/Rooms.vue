<template>
  <div class="navigator-rooms">
    <div class="top">
      <div class="toggle-type list" :class="{ active: roomCategory.viewMod === false }" @click="roomCategory.viewMod = false"></div>
      <div class="toggle-type grid" :class="{ active: roomCategory.viewMod === true }" @click="roomCategory.viewMod = true"></div>
      <h1>{{ roomCategory.name }}</h1>
    </div>
    <div :class="['rooms', roomCategory.viewMod === true ? 'grid' : 'list']">
      <div class="room" v-for="(room, i) in roomCategory.rooms" :key="i" @click="gotoRoom(room)">
        <plate-list :room="room" v-if="roomCategory.viewMod === false"></plate-list>
        <plate-grid :room="room" v-else></plate-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {RoomCategory} from '../../../../../../core/logic/navigator/RoomCategory';
import {Room} from '../../../../../../core/logic/navigator/Room';
import PlateList from './RoomPlate/List.vue';
import PlateGrid from './RoomPlate/Grid.vue';

export default Vue.extend({
  name: 'navigator-rooms',
  components: {
    PlateList,
    PlateGrid
  },
  props: {
    roomCategory: Object as () => RoomCategory
  },
  methods: {
    gotoRoom(room: Room) {
      this.$store.dispatch('navigator/openRoom', room);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/mixins";

.navigator-rooms {
  float: left;
  width: 100%;

  &:not(:first-child) {
    margin-top: 10px;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;

    .toggle-type {
      background-image: url('../../../../assets/images/sprite-itf1.png');
      width: 11px;
      height: 11px;
      margin-right: 5px;
      cursor: pointer;

      &.list {
        background-position: -19px -152px;

        &:hover, &.active {
          background-position: -19px -164px;
        }
      }

      &.grid {
        background-position: -31px -152px;

        &:hover, &.active {
          background-position: -31px -164px;
        }
      }
    }

    h1 {
      font-size: 13px;
      font-weight: bold;
      color: $grey;
      text-transform: uppercase;
    }
  }

  .rooms {
    &.list {
      > .room {
        &:nth-child(2n+1) > .list {
          background-color: $white;
        }
      }
    }

    &.grid {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: calc(100% + 9px);
      margin-top: -4px;

      .room {
        width: 105px;
        background-color: #d1e0d0;
        float: left;
        margin-right: 9px;
        border-radius: $medium-border-radius;
        margin-top: 9px;
        cursor: pointer;
        transition: 200ms ease-in-out background-color;
      }
    }
  }
}
</style>
