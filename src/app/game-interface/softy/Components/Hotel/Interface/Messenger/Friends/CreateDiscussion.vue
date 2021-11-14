<template>
  <div class="create-button" @click="openConsole" v-tooltip.right="'Nouvelle conversation'">
    <div class="icon"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "messenger-list-create-discussion",
  methods: {
    openConsole() {
      this.$store.commit('console/setConsoleDisplayed', true);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.create-button {
  width: 56px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($winter, 0.4);
  cursor: pointer;
  border-radius: $medium-border-radius - 2px;
  margin: 5px 10px 0 10px;

  .icon {
    @include itf-icon(15px, 15px, -65px, 0);

    transition: 200ms ease-in-out opacity;
    opacity: 0.4;
  }

  &:hover .icon {
    opacity: 0.3;
  }
}
</style>