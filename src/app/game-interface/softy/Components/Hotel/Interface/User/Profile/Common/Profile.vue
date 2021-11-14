<template>
  <div class="user-profile-plate">
    <div class="user">
      <div class="avatar">
        <holo-figure :figure="profile.figure"></holo-figure>
      </div>
      <div class="infos">
        <b>{{ profile.username }}</b>
        <slot name="spans"></slot>
      </div>
    </div>
    <div class="buttons">
      <icon-button class="rooms" text="Apparts" color="#63C3C9"></icon-button>
      <icon-button class="friend" text="C'est toi  👉👈" color="#9180ff" v-if="profile.id === userId"></icon-button>
      <icon-button class="friend" text="Ajouter en ami" color="#9180ff" @click.native="addFriend" v-else-if="relationState === 1"></icon-button>
      <icon-button class="friend" text="En attente..." color="#9180ff" v-else-if="relationState === 2"></icon-button>
      <icon-button class="friend" text="Votre relation" color="#9180ff" @click.native="toggleRelationshipsSelector" v-else></icon-button>
      <relationship-selector :is-visible="relationshipSelectorDisplayed"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HoloFigure from "../../../Elements/Figure.vue";
import IconButton from "../../../Elements/Buttons/Fat/IconButton.vue";
import {mapState} from "vuex";
import RelationshipSelector from "./RelationshipSelector.vue";

export default Vue.extend({
  name: 'user-profile-plate-common',
  components: {
    RelationshipSelector,
    HoloFigure,
    IconButton,
  },
  computed: {
    ...mapState('profile', ['profile', 'relationshipSelectorDisplayed']),
    ...mapState('clientData', ['userId']),
    relationState(): number {
      if (!this.profile.isMyFriend) {
        if (!this.profile.requestSent) {
          return 1;
        }

        return 2;
      }

      return 3;
    }
  },
  methods: {
    addFriend() {
      this.$store.dispatch('console/newFriendRequest', this.profile.username);
    },
    toggleRelationshipsSelector() {
      this.$store.commit('profile/setRelationshipSelectorDisplayed', !this.relationshipSelectorDisplayed);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.user-profile-plate {
  width: 370px;
  padding: 0 0 15px 15px;
  display: flex;
  flex-direction: column;

  .user {
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    border-radius: 12px;
    padding: 18px 15px;
    flex-direction: row;
    justify-content: space-between;
    background: $purple;
    background: url('../../../../../../assets/images/profile/light-isometric-tiles.png') no-repeat -50px center, linear-gradient(0deg, #63C3C9 0%, $purple 100%);

    .avatar {
      display: flex;
      flex: 1;
      margin-bottom: 20px;
    }

    .infos {
      width: calc(100% - 64px);
      padding-left: 15px;
      align-items: center;
      justify-content: center;
      align-content: center;
      height: 125px;
      display: flex;
      flex-direction: column;

      b {
        width: 100%;
        font-weight: bold;
        font-size: 18px;
        color: $white;
      }

      span {
        float: left;
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;

    .room {
    }

    .friend {
      width: 130%;
      margin-left: 15px;
    }
  }
}
</style>
