<template>
  <ul class="room-settings-navigation">
    <li v-for="item in navigationItems" @click="switchTo(item)" :class="['link', { active: categoryDisplayed.name === item.name }]">
      {{ item.humanName }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { INavigationInterface } from "../../../../../../../store/modules/game/Room/Interface/INavigationInterface";

export default Vue.extend({
  name: "room-settings-navigation",
  computed: {
    ...mapState('roomSettings', ['categoryDisplayed', 'navigationItems']),
  },
  methods: {
    switchTo(item: INavigationInterface) {
      this.$store.commit('roomSettings/displayCategory', item);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.room-settings-navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 15px 15px 10px;
  flex-wrap: wrap;

  .link {
    margin-left: 5px;
    border: 1px solid $grey;
    border-radius: $medium-border-radius;
    line-height: 30px;
    padding: 1.5px 10px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    color: $grey;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    transition: 200ms ease-in-out all;

    &:hover,
    &.active {
      background-color: lighten($grey, 53);
    }
  }
}
</style>
