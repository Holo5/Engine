<template>
  <grey-box v-if="display" class="current-item">
    <div slot="title" class="title">
      <h1 v-if="name">{{ name }}</h1>
      <h2 v-if="description">{{ description }}</h2>
    </div>
    <div slot="body" class="body">
      <div class="item">
        <img v-if="graphic !== undefined && displaySize === 'm'" :src="graphic">
        <img v-if="itemData.color !== undefined && displaySize === 's'" :src="catalogIcons + itemData.displayName + '_' + itemData.color + '_icon.png'">
        <img v-if="itemData.color === undefined && displaySize === 's'" :src="catalogIcons + itemData.displayName + '_icon.png'">
      </div>
      <div class="buttons">
        <div class="top">
          <fat-text icon="money" text="Acheter un" color="#eeb80e"></fat-text>
          <fat-text icon="pointer" text="Utiliser" color="#52bc48" @click="action('use')"></fat-text>
        </div>
        <div class="down" v-if="canEditRoom">
          <fat-button icon="move" v-tooltip.top="'Déplacer'" @click="action('move')"></fat-button>
          <fat-button icon="rotate" v-tooltip.top="'Tourner'" @click="action('rotate')"></fat-button>
          <fat-button icon="catch" v-tooltip.top="'Prendre'" @click="action('pickup')"></fat-button>
        </div>
      </div>
    </div>
  </grey-box>
</template>

<script lang="ts">
import Vue from 'vue';
import GreyBox from '../../../Elements/Box/GreyBox.vue';
import FatButton from '../../../Elements/Buttons/Fat/FatButton.vue';
import FatText from '../../../Elements/Buttons/Fat/TextButton.vue';
import {mapState} from 'vuex';
import {UserStatusType} from "../../../../../../../../core/logic/permissions/UserStatusType";
import {Configuration} from "../../../../../../../../../conf";

export default Vue.extend({
  name: 'current-item',
  components: {
    FatText,
    FatButton,
    GreyBox
  },
  computed: {
    ...mapState('previewInteraction', ['display', 'graphic', 'name', 'description', 'itemData', 'displaySize']),
    ...mapState('room', ['role']),
    canEditRoom() {
      return this.role === UserStatusType.CONTROLLER || this.role === UserStatusType.OWNER;
    },
    catalogIcons() {
      return Configuration.images.iconsDomain;
    },
  },
  methods: {
    close() {
      this.$store.commit('previewInteraction/close');
    },
    action(action: string) {
      this.$store.dispatch('bridge/interactionFurni', action);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.current-item {
  .title {
    h1 {
      font-size: 18px;
      line-height: 18px;
      font-weight: bold;
      color: $winter;
    }

    h2 {
      color: $winter;
      line-height: 1.4;
      font-size: 13px;
      font-weight: normal;
    }
  }

  .body {
    .item {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      flex-direction: row;
      min-height: 50px;
      margin-bottom: 10px;

      img {
        height: 100%
      }
    }

    .top {
      .fat-button {
        margin-top: 10px;
      }
    }

    .down {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px -5px 0;

      .fat-button {
        margin: 0 5px;
      }
    }
  }
}
</style>
