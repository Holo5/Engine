<template>
  <div class="grid">
    <div class="top">
      <div class="background" :style="'background: url(https://swf.habbocity.me/c_images/' + room.thumbnail + ')'"></div>
      <users-in :users-in="room.usersIn" :users-max="room.usersMax"></users-in>
    </div>
    <div class="title habbofont">
      <span>{{ room.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Room} from '../../../../../../../core/logic/navigator/Room';
import UsersIn from './UsersIn.vue';

export default Vue.extend({
  name: 'navigator-room-plate-grid',
  components: {
    UsersIn
  },
  props: {
    room: Object,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.grid {
  transition: 150ms ease-in-out all;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  &:nth-child(4n+4) {
    margin-right: 0;
  }

  .top {
    height: 105px;
    width: 105px;
    border-radius: $big-border-radius;
    background-image: url('../../../../../assets/images/room-no-image.png');

    .background {
      position: absolute;
      border-radius: $big-border-radius - 3;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
  }

  .title {
    padding: 10px;
    width: 100%;

    span {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
