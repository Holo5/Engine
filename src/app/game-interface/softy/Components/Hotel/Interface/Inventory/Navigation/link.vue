<template>
  <div @click="open" :class="['link', { active: currentLayout === layout }]">
    <div class="midtext">
      <div :class="['icon', layout]"></div> {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'navigation-link',
  computed: {
    ...mapState('inventory', ['currentLayout']),
  },
  props: {
    label: String,
    layout: String,
  },
  methods: {
    open(): void {
      this.$store.commit('inventory/setLayout', this.layout);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.link {
  margin-left: 5px;
  margin-top: 5px;
  border: 1px solid $grey;
  border-radius: $medium-border-radius;
  line-height: 30px;
  padding: 1.5px 12px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: 200ms ease-in-out all;
  width: calc(100% / 4 - (5px + 5px / 4));

  .midtext {
    display: flex;
    color: $grey;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.75;
      margin-right: 7px;
      transition: 200ms ease-in-out opacity;

      &.items {
        @include itf-icon(18px, 18px, 0, -152px);
      }

      &.pets {
        @include itf-icon(18px, 17px, -136px, -101px);
      }

      &.badges {
        @include itf-icon(13px, 18px, -122px, -101px);
      }

      &.bots {
        @include itf-icon(18px, 16px, -118px, -120px);
      }
    }
  }

  &:hover,
  &.active {
    background-color: lighten($grey, 53);
  }
}
</style>