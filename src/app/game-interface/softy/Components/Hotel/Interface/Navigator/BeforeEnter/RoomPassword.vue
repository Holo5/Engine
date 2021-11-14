<template>
  <draggable-box v-if="selectedRoom !== undefined && needPassword === true" class="hotel-box-room-details">
    <span slot="title">Appartement fermé à code</span>
    <div slot="body" class="box-body-content">
      <div class="top-details">
        <div class="image">
          <div class="background" :style="'background: url(' + selectedRoom.photo + ')'"></div>
          <users-in :users-in="selectedRoom.usersIn" :users-max="selectedRoom.usersMax"></users-in>
        </div>
        <div class="details">
          <div class="line">
            <b class="large">{{ selectedRoom.name }}</b>
            <p>Par {{ selectedRoom.ownerName }}</p>
            <p>{{ roomDescription }}</p>
          </div>
        </div>
      </div>
      <div class="error" v-if="padlockError">
        {{ padlockError }}
      </div>
      <div class="form">
        <input type="password" name="password" placeholder="Mot de passe" v-model="password">
        <icon-button :text="'Entrer'" :icon="'password'" @click.native="goto" :color="'#2e7f8b'"></icon-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import UsersIn from '../RoomPlate/UsersIn.vue';
import IconButton from '../../Elements/Buttons/Fat/IconButton.vue';

export default Vue.extend({
  name: 'navigator-room-password',
  components: {
    DraggableBox,
    UsersIn,
    IconButton
  },
  computed: {
    ...mapState('navigator', ['selectedRoom', 'needPassword', 'padlockError']),
    roomDescription() {
      return this.selectedRoom.description ? this.selectedRoom.description : 'Aucune description';
    },
  },
  data: () => ({
    password: '',
  }),
  methods: {
    closeBox(): void {
      this.$store.commit('navigator/closeSelectedRoom');
    },
    goto(): void {
      this.$store.dispatch('navigator/tryPasswordPadlockedRoom', {room: this.selectedRoom, password: this.password}, {root: true});
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-box-room-details {
  width: 355px;
  left: calc(50% - 355px / 2);
  top: calc(50% - 355px / 2);

  .box-top > span {
    width: 300px;
  }

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
        background-image: url('../../../../../assets/images/room-no-image.png');

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

            &.large {
              font-size: 16px;
            }
          }

          b {
            font-weight: bold;
          }
        }
      }
    }

    .error {
      margin-top: 15px;
      background-color: $red;
      color: $white;
      border-radius: $medium-border-radius;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
      width: 100%;
      margin-right: 15px;
      padding: 11px 15px;
      font-size: 14px;
    }

    .form {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 15px;

      input {
        background-color: $white;
        border-radius: $medium-border-radius;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        height: 38px;
        width: 180%;
        margin-right: 15px;
        padding: 0 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
