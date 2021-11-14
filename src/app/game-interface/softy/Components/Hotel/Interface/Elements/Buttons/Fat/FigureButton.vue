<template>
  <fat-button :color="color" :opacify="false" :class="{ 'in': inDiv, small }">
    <div :class="['figure-btn', { small }]" slot="body">
      <holo-figure :figure="figure" :size="'n'" class="figure"></holo-figure>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from './FatButton.vue';
import HoloFigure from '../../Figure.vue';

export default Vue.extend({
  name: 'elements-buttons-fat-figure',
  components: {
    FatButton,
    HoloFigure
  },
  props: {
    figure: String,
    color: {
      type: String,
      default: '#a3a3a3',
    },
    inDiv: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.fat-button {
  &.in {
    overflow: hidden;
  }

  .figure-btn {
    height: 65px;
    overflow: hidden;
    margin-left: -3px;
    position: absolute;
    margin-top: -29px;

    .figure {
      height: auto;
    }
  }

  &.small {
    width: 44px;

    .figure-btn {
      margin-left: -10px;
    }
  }
}
</style>
