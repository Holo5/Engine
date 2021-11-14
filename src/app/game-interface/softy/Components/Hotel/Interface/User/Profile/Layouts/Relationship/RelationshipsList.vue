<template>
  <div class="user-relationships-list" v-if="profile.relationships !== null">
    <informations-group v-if="profile.totalRelationships > 0" :label="'Relations (' + profile.totalRelationships + ')'"></informations-group>
    <informations-group v-if="profile.totalRelationships === 0" :label="'Aucune relation...'"></informations-group>
    <div class="users-list">
      <div class="user" v-for="user in sortByLevel">
        <div class="user-infos">
          <elements-buttons-fat-figure :color="getColorFromLevel(user.level)" :in-div="true" :small="true" :figure="user.figure"></elements-buttons-fat-figure>
          <span @click="openProfile(user.userId)">{{ user.username }}</span>
        </div>
        <div :class="['relation-icon', getIconFromLevel(user.level)]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import SmallIconButton from "../../../../Elements/Buttons/Fat/SmallIconButton.vue";
import ElementsButtonsFatFigure from "../../../../Elements/Buttons/Fat/FigureButton.vue";
import InformationsGroup from "../../../../Elements/Inputs/InformationsGroup.vue";
import {ERelationshipLevel} from "../../../../../../../../../core/logic/profile/interfaces/ERelationshipLevel";

export default Vue.extend({
  name: 'user-relationships-list',
  components: {
    InformationsGroup,
    ElementsButtonsFatFigure,
    SmallIconButton,
  },
  computed: {
    ...mapState('profile', ['profile']),
    sortByLevel() {
      if (this.profile.relationships !== null) {
        return this.profile.relationships.sort((a: { level: number; }, b: { level: number; }) => a.level - b.level);
      }

      return null;
    }
  },
  methods: {
    openProfile(userId: number) {
      this.$store.dispatch('profile/viewProfile', userId);
    },
    getColorFromLevel(level: ERelationshipLevel) {
      return level === ERelationshipLevel.BOBBA ? 'grey' : level === ERelationshipLevel.SMILE ? '#d8974c' : 'pink';
    },
    getIconFromLevel(level: ERelationshipLevel) {
      return level === ERelationshipLevel.BOBBA ? 'bobba' : level === ERelationshipLevel.SMILE ? 'smile' : 'heart';
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";
@import "../../../../../../../assets/sass/mixins";

.user-relationships-list {
  width: 180px;
  margin-right: 15px;
  background-color: darken($winter, 4);
  border-radius: $medium-border-radius;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  .informations-group {
    margin-bottom: -2px;
  }

  .users-list {
    overflow: auto;
    height: 229px;
    background: url('../../../../../../../assets/images/profile/no-relation.png'), transparent;
    border-radius: $medium-border-radius;

    .user {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: $medium-border-radius;
      margin-top: 5px;
      background-color: transparent;
      transition: 150ms ease-in-out background-color;
      cursor: pointer;
      padding-right: 7px;
      height: 38px;

      .fat-button {
        box-shadow: none;
      }

      .user-infos {
        display: flex;
        flex-direction: row;
        margin: -1px;
        align-items: center;

        span {
          margin-left: 9px;
          font-size: 14px;
          font-weight: bold;
        }
      }

      .relation-icon {
        position: absolute;
        right: 0;

        &.bobba {
          @include itf-icon(13px, 13px, -200px, -200px);
        }

        &.smile {
          @include itf-icon(13px, 13px, -200px, -200px);
        }

        &.heart {
          @include itf-icon(13px, 13px, -200px, -200px);
        }
      }
    }
  }
}
</style>
