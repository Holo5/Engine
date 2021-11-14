<template>
  <div class="title" :style="'background-color:' + color" :class="{ 'padding-top': paddingTop }">
    <div class="background" :style="'background-image:url(' + iconUrl + ')'"></div>
    <img v-if="icon" :src="iconUrl" :alt="title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Configuration} from '../../../../../../../../conf';

export default Vue.extend({
  name: 'shop-modules-title',
  props: {
    icon: String,
    title: String,
    color: {
      type: String,
      default: '#f2b701',
    },
    paddingTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconUrl() {
      return Configuration.images.catalogDomain + this.icon + '.gif';
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.title {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: $big-border-radius;
  overflow: hidden;

  &.padding-top {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .background {
    width: 176px;
    height: 199px;
    position: absolute;
    right: -50px;
    top: -50px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
    image-rendering: pixelated;
    opacity: 0.1;
    z-index: -1;
  }

  img {
    margin-right: 20px;
  }

  h1 {
    color: $white;
    font-size: 18px;
    width: 50%;
  }
}
</style>
