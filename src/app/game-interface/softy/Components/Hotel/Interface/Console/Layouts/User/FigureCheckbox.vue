<template>
  <div :class="['figure', { keepShowed: checked }]">
    <fat-button :opacify="false" class="checkbox">
      <div class="checkbox-container" slot="body">
        <input type="checkbox" name="user-checkbox" id="user-checkbox" v-model="checked">
        <div class="fake-checkbox">
          <small-icon-button v-if="!checked" icon="empty-border" iconType="square" color="transparent"></small-icon-button>
          <small-icon-button v-else icon="tick" iconType="square" color="transparent"></small-icon-button>
        </div>
      </div>
    </fat-button>
    <buttons-small-figure class="user-figure" color="#9180ff" :figure="figure"></buttons-small-figure>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";
import FatButton from "../../../Elements/Buttons/Fat/FatButton.vue";
import ButtonsSmallFigure from "../../../Elements/Buttons/Small/FigureButton.vue";

export default Vue.extend({
  name: "friend-figure-checkbox",
  props: {
    figure: String,
  },
  components: {
    ButtonsSmallFigure,
    FatButton,
    SmallIconButton
  },
  data: () => ({
    checked: false,
  }),
  watch: {
    checked(newValue, oldValue) {
      this.$emit('updateCheckedValue', newValue);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.figure {
  width: 42px;
  height: 38px;

  .user-figure {
    position: absolute;
    top: 0;
    left: 0;
  }

  .checkbox {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 42px;
    height: 38px;
    z-index: 99;
    box-shadow: none;
    opacity: 0;
    transition: 150ms ease-in-out opacity;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba($purple, 0.8)!important;

    .checkbox-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      input[type="checkbox"] {
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  &:hover,
  &.keepShowed {
    .checkbox {
      opacity: 1;
    }
  }
}
</style>