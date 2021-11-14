<template>
  <draggable-box class="hotel-box-room-informations" v-if="roomInformationsOpened">
    <span slot="title">Informations sur l'appart</span>
    <div slot="body" class="box-body-content">
      <room-infos-top></room-infos-top>
      <room-infos-buttons></room-infos-buttons>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import SmallIconButton from '../../Elements/Buttons/Fat/SmallIconButton.vue';
import RoomInfosTop from './Details/Top.vue';
import RoomInfosButtons from './Details/Buttons.vue';

export default Vue.extend({
  components: {
    RoomInfosButtons,
    RoomInfosTop,
    SmallIconButton,
    DraggableBox,
  },
  name: 'room-infos',
  computed: {
    ...mapState('navigator', ['roomInformationsOpened'])
  },
  methods: {
    closeBox(): void {
      this.$store.commit('navigator/closeRoomInformations');
    },
  },
});
</script>

<style lang="scss" scoped>
.hotel-box-room-informations {
  width: 355px;
  left: calc(50% - 355px / 2);
  top: calc(50% - 355px / 2);

  .box-body-content {
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;
  }
}
</style>
