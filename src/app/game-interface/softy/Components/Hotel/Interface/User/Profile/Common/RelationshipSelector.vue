<template>
  <div class="relationship-selector" v-if="isVisible">
    <div class="body">
      <div :class="['relation empty', { selected: relationshipCurrentLevel === eRelationshipLevel.EMPTY }]" @click="selectRelationshipLevel(eRelationshipLevel.EMPTY)">
        <div class="empty">x</div>
      </div>
      <div :class="['relation', { selected: relationshipCurrentLevel === eRelationshipLevel.HEART }]" @click="selectRelationshipLevel(eRelationshipLevel.HEART)">
        <div class="heart"></div>
      </div>
      <div :class="['relation', { selected: relationshipCurrentLevel === eRelationshipLevel.SMILE }]" @click="selectRelationshipLevel(eRelationshipLevel.SMILE)">
        <div class="smile"></div>
      </div>
      <div :class="['relation', { selected: relationshipCurrentLevel === eRelationshipLevel.BOBBA }]" @click="selectRelationshipLevel(eRelationshipLevel.BOBBA)">
        <div class="bobba"></div>
      </div>
    </div>
    <div class="tongue"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {ERelationshipLevel} from "../../../../../../../../core/logic/profile/interfaces/ERelationshipLevel";
import {mapGetters, mapState} from "vuex";
import {Friend} from "../../../../../../../../core/logic/console/Friend";

export default Vue.extend({
  name: 'relationship-selector',
  props: {
    isVisible: Boolean,
  },
  computed: {
    ...mapGetters('console', ['friendsUnduplicated']),
    ...mapState('profile', ['profile']),
    relationshipCurrentLevel() {
      const friend = this.friendsUnduplicated.find((friend: Friend) => friend.id === this.profile.id);

      console.log(friend);

      return friend ? friend.relationshipLevel : ERelationshipLevel.EMPTY;
    },
    eRelationshipLevel() {
      return ERelationshipLevel;
    },
  },
  methods: {
    selectRelationshipLevel(level: ERelationshipLevel) {
      this.$store.dispatch('profile/changeRelationshipLevel', level);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/mixins";

.relationship-selector {
  position: absolute;
  right: 7px;
  top: -37px;

  .tongue {
    transform: rotate(180deg);
    right: 9px;
    position: absolute;
    bottom: -11.9px;
    width: 40.796875px;
    height: 12.421875px;
    background-image: url('~/app/game-interface/softy/assets/images/tongue.png');
    background-repeat: no-repeat;
    background-position: center top;
  }

  .body {
    background-color: $white;
    border-radius: $medium-border-radius;
    display: flex;
    flex-direction: row;

    .relation {
      margin: 5px 5px 5px 0;
      cursor: pointer;
      padding: 5px;
      border-radius: $small-border-radius;

      &.empty {
        background-color: lighten($grey-light-light-light, 13);
      }

      &:hover,
      &.selected {
        background-color: $grey-light-light-light;
      }

      &:first-child {
        margin-left: 5px;
      }

      .empty {
        width: 13px;
        height: 13px;
        text-align: center;
        line-height: 13px;
        font-weight: bold;
        font-size: 12px;
      }

      .heart {
        @include itf-icon(13px, 13px, -300px, -63px);
      }

      .smile {
        @include itf-icon(13px, 13px, -300px, -77px);
      }

      .bobba {
        @include itf-icon(13px, 13px, -300px, -91px);
      }
    }
  }
}
</style>
