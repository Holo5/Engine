<template>
  <div class="top-details">
    <div class="image">
      <div class="background" :style="'background: url(https://swf.habbocity.me/c_images/' + roomData.thumbnail + ')'"></div>
      <users-in :users-in="roomData.usersIn" :users-max="roomData.usersMax"></users-in>
    </div>
    <div class="details">
      <div class="line">
        <b class="large">
          <span class="group" v-tooltip="'QG du groupe ' + roomData.group.name" v-if="roomData.group.name"></span>
          {{ roomData.name }}
        </b>
        <p>Par {{ roomData.ownerName }} - {{ roomData.score }} notes</p>
        <p>{{ roomDescription }}</p>
      </div>
      <div class="line buttons">
        <div class="button" v-tooltip="'J\'aime'" @click="toggleLike">
          <div class="icon like"></div>
        </div>
        <div class="button" v-tooltip="'Définir comme appart d\'arrivée'" @click="setHomeRoom">
          <div class="icon home"></div>
        </div>
        <div class="button" v-tooltip="'Signaler'" @click="report">
          <div class="icon report"></div>
        </div>
        <!-- TODO: Add camera icon here -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import UsersIn from '../../../Navigator/RoomPlate/UsersIn.vue';

export default Vue.extend({
  name: 'room-infos-top',
  components: {
    UsersIn
  },
  computed: {
    ...mapState('navigator', ['roomInformationsOpened']),
    ...mapState('room', ['roomData']),
    roomDescription() {
      return this.roomData.description ? this.roomData.description : 'Aucune description';
    },
  },
  methods: {
    toggleLike(): void {
      // TODO: like room
    },
    setHomeRoom(): void {
      // TODO: set as home room
    },
    report(): void {
      // TODO: report room
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.top-details {
  height: 105px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .image {
    height: 105px;
    width: 105px;
    border-radius: $big-border-radius;
    background-image: url('../../../../../../assets/images/room-no-image.png');

    .background {
      position: absolute;
      border-radius: $big-border-radius;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
  }

  .details {
    height: 105px;
    width: calc(100% - 105px - 13px);
    display: flex;
    align-content: space-between;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 5px;

    .line {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-top: -5px;

      p,
      b,
      span {
        width: 100%;
        word-wrap: break-word;
        word-break: break-word;
        margin-top: 5px;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .group {
          float: left;
          margin-top: 2px;
          margin-right: 4px;

          @include itf-icon(13px, 14px, -48px, -159px);
        }

        &.large {
          font-size: 16px;
        }
      }

      b {
        font-weight: bold;
      }

      &.buttons > .button {
        margin-top: 0;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        opacity: 0.8;
        transition: 200ms ease-in-out opacity;

        &:hover {
          opacity: 0.6;
        }

        .icon {
          width: 10px;
          height: 10px;

          &.like {
            @include itf-icon(16px, 18px, -20px, -17px);
          }

          &.home {
            @include itf-icon(18px, 18px, -57px, -17px);
          }

          &.report {
            @include itf-icon(17px, 18px, -76px, -17px);
          }
        }
      }
    }
  }
}
</style>
