<template>
  <div class="bloc sub signs">
    <h1>Panneaux</h1>
    <div class="signs-list">
      <span class="action" @click="sign(1)">1</span>
      <span class="action" @click="sign(2)">2</span>
      <span class="action" @click="sign(3)">3</span>
      <span class="action" @click="sign(4)">4</span>
      <span class="action" @click="sign(5)">5</span>
      <span class="action" @click="sign(6)">6</span>
      <span class="action" @click="sign(7)">7</span>
      <span class="action" @click="sign(8)">8</span>
      <span class="action" @click="sign(9)">9</span>
      <span class="action" @click="sign(10)">10</span>
      <span class="action heart" @click="sign('heart')"></span>
      <span class="action skull" @click="sign('skull')"></span>
      <span class="action" @click="sign(0)">0</span>
      <span class="action exclamation" @click="sign('exclamation')"></span>
      <span class="action" @click="sign('smile')">:)</span>
      <span class="action ball" @click="sign('ball')"></span>
      <span class="action yellow" @click="sign('yellow')"></span>
      <span class="action red" @click="sign('red')"></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'user-menu-signs',
  methods: {
    sign(number: any) {
      // TODO: set sign (c les panneaux)
    },
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/mixins";

.signs {
  display: flex;
  flex-direction: column;
  padding: 7px 10px 10px #{$big-border-radius + 10px} !important;
  pointer-events: auto;
  z-index: 3;

  h1 {
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -1px;
    padding-left: 2px;
    width: 100%;
  }

  .signs-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 6.9px;
    grid-row-gap: 6.9px/2;

    .action {
      background-color: #666;
      border-radius: $medium-border-radius - 2;
      cursor: pointer;
      margin-top: 6.9px;
      color: $white;
      width: 26px;
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      transition: 200ms ease-in-out background-color;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: bold;

      &::after {
        content: '';
      }

      &.heart::after {
        @include itf-icon(15px, 13px, -118px, -137px);
      }

      &.skull::after {
        @include itf-icon(12px, 12px, -118px, -151px);
      }

      &.exclamation::after {
        @include itf-icon(7px, 17px, -279px, -60px);
      }

      &.ball::after {
        @include itf-icon(20px, 20px, -279px, -78px);
      }

      &.yellow::after {
        @include itf-icon(11px, 19px, -268px, -99px);
      }

      &.red::after {
        @include itf-icon(11px, 19px, -280px, -99px);
      }

      &:hover {
        background-color: lighten(#666, 10);
      }
    }
  }
}
</style>
