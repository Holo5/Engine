<template>
  <div class="bloc sub dances">
    <h1>Danses</h1>
    <span class="action" @click="dance">Robot</span>
    <span class="action" @click="theRollie">The Rollie</span>
    <span class="action" @click="duckFunk">Duck Funk</span>
    <span class="action" @click="pogoMogo">Pogo Mogo</span>
    <span class="action disabled">Tecktonik</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'user-menu-dances',
  methods: {
    dance() {
      // TODO: default dance
    },
    theRollie() {
      // TODO: dance the rollie
    },
    duckFunk() {
      // TODO: dance duck funk
    },
    pogoMogo() {
      // TODO: dance pogo mogo
    },
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/colors";

.dances {
  display: flex;
  flex-direction: column;
  padding: 7px 10px 10px #{$big-border-radius + 10px} !important;
  pointer-events: auto;
  white-space: nowrap;
  z-index: 4;

  h1 {
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -1px;
    padding-left: 2px;
  }

  .action {
    background-color: #666;
    border-radius: $medium-border-radius - 2;
    cursor: pointer;
    margin-top: 6.9px;
    color: $white;
    padding: 0 15px 0 11px;
    line-height: 25px;
    font-size: 14px;
    transition: 200ms ease-in-out background-color;

    &.disabled {
      opacity: 0.5;
      cursor: default;
    }

    &:not(.disabled):hover {
      background-color: lighten(#666, 10);
    }
  }
}
</style>
