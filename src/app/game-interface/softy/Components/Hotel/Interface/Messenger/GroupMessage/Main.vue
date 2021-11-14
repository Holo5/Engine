<template>
  <draggable-box class="hotel-box-group-message" v-if="groupMessageDisplayed">
    <span slot="title">Message groupé</span>
    <div slot="body" class="box-body-content">
      <p>Envoie une invitation par message aux {{ groupMessageFriends.length }} amis sélectionnés.</p>
      <textarea name="message" id="message" placeholder="Écrire ici" v-model="message" maxlength="120"></textarea>
      <div class="buttons">
        <small-icon-button icon="small-close" color="#c53131" :text="'Annuler'" @click.native="closeBox"></small-icon-button>
        <small-icon-button icon="tick" :text="'Envoyer'" @click.native="send"></small-icon-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import SmallIconButton from '../../Elements/Buttons/Fat/SmallIconButton.vue';

export default Vue.extend({
  components: {
    SmallIconButton,
    DraggableBox,
  },
  data: () => ({
    message: '',
  }),
  name: 'group-message-write',
  computed: {
    ...mapState('messenger', ['groupMessageDisplayed', 'groupMessageFriends'])
  },
  methods: {
    closeBox() {
      this.message = '';
      this.$store.commit('messenger/setGroupMessageDisplayed', false);
    },
    send() {
      this.$store.dispatch('messenger/sendGroupedMessage',  this.message);
      this.closeBox();
    }
  },
});
</script>

<style lang="scss" scoped>
@import '../../../../../assets/sass/colors';
@import '../../../../../assets/sass/variables';

.hotel-box-group-message {
  width: 330px;
  left: calc(50% - 355px / 2);
  top: calc(50% - 355px / 2);

  .box-body-content {
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;

    textarea {
      resize: none;
      padding: 10px 13px 8px 14px;
      line-height: 1.5;
      min-height: 82px;
      font-size: 14px;
      font-weight: 500;
      border-radius: $medium-border-radius;
      background-color: $white;
      margin-top: 15px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    }

    .buttons {
      margin-top: 12px;
      transition: 200ms ease-in-out all;
      display: flex;
      flex-direction: row;
      width: calc(100% + 12px);
      margin-left: -12px;

      ::v-deep .small-icon-button {
        margin-left: 12px;
      }
    }
  }
}
</style>
