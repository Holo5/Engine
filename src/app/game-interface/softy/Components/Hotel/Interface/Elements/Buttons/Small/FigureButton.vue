<template>
  <fat-button :color="color" :opacify="false" class="btn">
    <div class="figure-btn" slot="body">
      <holo-figure :figure="figure" :size="'n'" class="figure"></holo-figure>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from '../Fat/FatButton.vue';
import HoloFigure from '../../Figure.vue';

export default Vue.extend({
  name: 'elements-buttons-small-figure',
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
  },
});
</script>

<style lang="scss" scoped>
.btn {
  overflow: hidden;
  width: 42px;
  height: 38px;

  .figure-btn {
    height: 65px;
    overflow: hidden;
    margin-left: -12px;
    position: absolute;
    margin-top: -25px;

    .figure {
      height: auto;
    }
  }
}
</style>
