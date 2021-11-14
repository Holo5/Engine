<template>
  <ul class="console-navigation">
    <li @click="goto('friends')" :class="friendClass">Mes amis</li>
    <li @click="goto('textamigos')" :class="textamigosClass">Textamigos ({{ textamigosSize }})</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters, mapState} from "vuex";

export default Vue.extend({
  name: "console-navigation",
  computed: {
    ...mapState('console', ['currentLayout']),
    ...mapGetters('console', ['requestsUsersUnduplicated']),
    textamigosSize() {
      return this.requestsUsersUnduplicated.length;
    },
    friendClass() {
      return {
        current: this.currentLayout === 'friends',
      };
    },
    textamigosClass() {
      return {
        current: this.currentLayout === 'textamigos',
        disabled: this.textamigosSize <= 0,
      };
    }
  },
  methods: {
    goto(layout: string) {
      if (this.requestsUsersUnduplicated <= 0 && layout === 'textamigos') {
        return false;
      }

      if (layout === 'friends') {
        this.$store.commit('console/setSearchValue', '');
      }

      this.$store.commit('console/setCurrentLayout', layout);
    },
  },
  watch: {
    textamigosSize(newValue) {
      if (newValue <= 0) {
        this.goto('friends');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";

ul.console-navigation {
  width: calc(100% + 10px);
  display: flex;
  flex-direction: row;
  margin: 12px 0 0 -10px;
  justify-content: space-between;

  li {
    border: 1px solid $grey;
    border-radius: $medium-border-radius;
    line-height: 30px;
    cursor: pointer;
    transition: 200ms ease-in-out all;
    width: 100%;
    text-align: center;
    margin-left: 10px;
    color: $grey;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &:not(.disabled) {
      &:hover,
      &.current {
        background-color: lighten($grey, 50);
      }
    }
  }
}
</style>