<template>
  <div class="col">
    <current-room></current-room>
    <room-infos-chatlogs></room-infos-chatlogs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CurrentRoom from './CurrentRoom.vue';
import RoomInfosChatlogs from './Chatlogs.vue';

export default Vue.extend({
  name: 'base-down-left',
  components: {
    RoomInfosChatlogs,
    CurrentRoom
  },
});
</script>

<style lang="scss" scoped>
.col {
  width: 210px;
  display: flex;
  flex-direction: column-reverse;
  height: calc(100vh - 15px - 60px);
  align-content: flex-start;
}
</style>
