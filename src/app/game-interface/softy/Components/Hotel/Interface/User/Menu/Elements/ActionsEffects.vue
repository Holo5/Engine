<template>
  <div class="bloc sub ae">
    <h1>Actions</h1>
    <span class="action" @click="sit">S'assoir</span>
    <span class="action" @click="salute">Saluer</span>
    <span class="action" @click="kiss">Embrasser</span>
    <span class="action" @click="laught">Rire</span>
    <span class="action" @click="idle">Absent</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'user-menu-actions-effects',
  methods: {
    sit() {
      // TODO: user sit
    },
    salute() {
      // TODO: user salute (o/)
    },
    kiss() {
      // TODO: user kiss
    },
    laught() {
      // TODO: user laught
    },
    idle() {
      // TODO: user idle
    },
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/variables";
@import "../../../../../../assets/sass/colors";

.ae {
  display: flex;
  flex-direction: column;
  padding: 7px 10px 10px #{$big-border-radius + 10px} !important;
  pointer-events: auto;
  white-space: nowrap;
  z-index: 5;

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

    &:hover {
      background-color: lighten(#666, 10);
    }
  }
}
</style>
