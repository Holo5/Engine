<template>
  <div class="list">
    <div class="col left">
      <users-in :users-in="room.usersIn" :users-max="room.usersMax"></users-in>
      <div class="title habbofont">{{ room.name }}</div>
    </div>
    <div class="col right">
      <div class="ico is-group" v-tooltip="'QG de groupe'" v-if="room.groupId !== undefined"></div>
      <div class="ico status" v-if="room.status !== 'open'" :class="room.status"></div>
      <div class="ico details" @click="openDetails(room, $event)">i</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UsersIn from './UsersIn.vue';

export default Vue.extend({
  name: 'navigator-room-plate-list',
  props: {
    room: Object,
  },
  components: {
    UsersIn
  },
  methods: {
    openDetails(room, e) {
      e.stopPropagation();
      this.$store.commit('navigator/displayDetails', this.room);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.list {
  cursor: pointer;
  background-color: #d1e0d0;
  margin-top: 5px;
  border-radius: $big-border-radius;
  width: 100%;
  float: left;
  transition: 150ms ease-in-out all;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }

  .left {
    float: left;
    width: calc(100% - 81px);

    .title {
      float: left;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: bold;
      margin: 5px;
      cursor: pointer;
      width: calc(100% - 70px);
    }
  }

  .right {
    float: right;
    display: flex;
    align-items: center;
    justify-content: right;
    height: 35px;

    .ico {
      margin-right: 8px;

      &.details {
        background-color: $green;
        font-size: 12px;
        font-weight: bold;
        padding: 3px 8px;
        border-radius: 50%;
        color: $white;
      }

      &.is-group {
        @include itf-icon(13px, 14px, -48px, -159px);
      }

      &.status.knock-knock {
        @include itf-icon(13px, 15px, -48px, -143px);
      }

      &.status.password {
        @include itf-icon(13px, 15px, -48px, -127px);
      }
    }
  }
}
</style>
