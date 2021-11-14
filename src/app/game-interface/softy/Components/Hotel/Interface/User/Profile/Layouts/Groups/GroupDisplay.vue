<template>
  <div class="user-profile-group-display" v-if="group !== null">
    <div class="texts">
      <b class="title">{{ group.title }}</b>
      <small>{{ group.memberSize }} membres</small>
      <small>Crée le {{ group.createdAt }} !</small>
      <span>{{ group.description }}</span>
    </div>
    <div class="buttons">
      <elements-fat-button icon="home" color="#65af64" v-tooltip="'QG du groupe'"></elements-fat-button>
      <elements-fat-button icon="catch" color="#9180ff" v-tooltip="'Postuler'"></elements-fat-button>
      <elements-fat-button icon="flag" v-tooltip="'Reporter'"></elements-fat-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import ElementsFatButton from "../../../../Elements/Buttons/Fat/FatButton.vue";

export default Vue.extend({
  name: 'user-profile-group-display',
  components: {
    ElementsFatButton,
  },
  computed: {
    ...mapState('profile', ['group']),
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";
@import "../../../../../../../assets/sass/mixins";

.user-profile-group-display {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .texts {
    display: flex;
    flex-direction: column;

    b.title {
      font-size: 15px;
      font-weight: 500;
    }

    small {
      font-size: 13px;
      margin-top: 2px;
      opacity: .6;
    }

    span {
      font-size: 13px;
      margin-top: 15px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    ::v-deep .fat-button {
      width: 55px;
      box-shadow: none;
    }
  }
}
</style>