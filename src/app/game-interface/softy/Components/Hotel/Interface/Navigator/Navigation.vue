<template>
  <div class="hotel-navigation">
    <div class="link" @click="openCategory('official_view')" :class="{ active: current === 'official_view' }">
      <div class="icon public"></div>
      Public
    </div>
    <div class="link" @click="openCategory('hotel_view')" :class="{ active: current === 'hotel_view' }">
      <div class="icon top"></div>
      Top
    </div>
    <div class="link" @click="openCategory('roomcustom_view')" :class="{ active: current === 'roomcustom_view' }">
      <div class="icon categories"></div>
      Catégories
    </div>
    <div class="link" @click="openCategory('myworld_view')" :class="{ active: current === 'myworld_view' }">
      <div class="icon world"></div>
      Mon monde
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'navigator-navigation',
  data: () => ({
    current: 'official_view',
  }),
  methods: {
    openCategory(name: string, emitSearchRequest = true): void {
      this.current = name;

      if (emitSearchRequest === true) {
        this.$store.dispatch('navigator/changeCategory', name);
      }
    },
  },
  mounted(): void {
    this.openCategory('official_view', false);
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/mixins";

.hotel-navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0 0 -5px;
  flex-wrap: wrap;

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
    color: $grey;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    transition: 200ms ease-in-out all;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 7px;
      height: 30px;
      margin-top: 5px;
      opacity: 0.75;
      transition: 200ms ease-in-out opacity;

      &.public {
        @include itf-icon(18px, 18px, 0, -17px);
      }

      &.top {
        @include itf-icon(18px, 18px, -19px, -17px);
      }

      &.categories {
        @include itf-icon(18px, 18px, -38px, -17px);
      }

      &.world {
        @include itf-icon(18px, 18px, -57px, -17px);
      }
    }

    &:hover,
    &.active {
      background-color: lighten($grey, 53);
    }
  }
}
</style>
