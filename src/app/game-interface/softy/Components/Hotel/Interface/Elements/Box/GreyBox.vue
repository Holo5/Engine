<template>
  <div class="holo-grey-box">
    <div class="box-top">
      <slot name="title" class="title"></slot>
      <icon-button :type="'square'" :opacity="100" :theme="'light'" :icon="icon" @click.native="close"></icon-button>
    </div>
    <div class="box-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconButton from '../Buttons/Small/IconButton.vue';

export default Vue.extend({
  name: 'elements-grey-box',
  components: {
    IconButton
  },
  props: {
    icon: {
      type: String,
      default: 'close'
    },
  },
  methods: {
    close() {
      this.$parent.close();
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.holo-grey-box {
  @include blur-background;

  width: 210px;
  background-color: $grey;
  border-radius: $big-border-radius;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 15px;
  pointer-events: auto;

  .box-top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title {
      width: calc(100% - 40px);
      overflow: hidden;
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      color: #e7e9eb;
    }
  }
}
</style>
