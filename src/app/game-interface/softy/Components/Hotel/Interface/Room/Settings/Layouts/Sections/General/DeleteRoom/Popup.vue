<template>
  <draggable-box class="confirm-room-deletion" v-if="roomDeletionDisplayed">
    <span slot="title">Confirmation</span>
    <div slot="body" class="box-body-content">
      <div class="top-details">
        <div class="image">
          <div class="background" :style="'background: url(https://swf.habbocity.me/c_images/' + currentRoom.thumbnail + ')'"></div>
        </div>
        <div class="details">
          <div class="line">
            <b class="large">{{ roomSettingsData.name }}</b>
            <p>Es-tu sûr de vouloir supprimer cet appart ?</p>
            <b class="margin">Attention, cette action est irréversible.</b>
          </div>
        </div>
      </div>
      <div class="down-button">
        <div class="double">
          <small-icon-button icon="small-close" color="#a3a3a3" text="Annuler" @click.native="closeBox"></small-icon-button>
          <small-icon-button icon="tick" color="#c53131" text="Supprimer" @click.native="deleteRoom"></small-icon-button>
        </div>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import DraggableBox from "../../../../../../Elements/Box/DraggableBox.vue";
import SmallIconButton from "../../../../../../Elements/Buttons/Fat/SmallIconButton.vue";

export default Vue.extend({
  name: "confirm-room-deletion",
  components: {
    SmallIconButton,
    DraggableBox,
  },
  computed: {
    ...mapState('navigator', ['currentRoom']),
    ...mapState('roomSettings', ['roomSettingsData', 'roomDeletionDisplayed']),
  },
  methods: {
    closeBox() {
      this.$store.commit('roomSettings/setRoomDeletionConfirmDisplayed', false);
    },
    deleteRoom() {
      this.$store.dispatch('roomSettings/deleteRoom');
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../../../assets/sass/colors";
@import "../../../../../../../../../assets/sass/variables";
@import "../../../../../../../../../assets/sass/mixins";

.confirm-room-deletion {
  width: 355px;
  left: calc(50% - 355px / 2);
  top: calc(50% - 355px / 2);

  .box-body-content {
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;

    .top-details {
      height: 105px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .image {
        height: 105px;
        width: 105px;
        border-radius: $big-border-radius;
        background-image: url('~/app/game-interface/softy/assets/images/room-no-image.png');

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
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          &.large {
            font-size: 16px;
          }
        }

        b {
          font-weight: bold;
        }
      }
    }

    .down-button {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-top: 15px;

      .double {
        display: flex;
        flex-direction: row;
        width: calc(100% + 10px);
        margin-left: -10px;

        .small-icon-button {
          margin-left: 10px;

          ::v-deep span {
            width: calc(100% - 65px);
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
