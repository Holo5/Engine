<template>
  <fat-button :color="color" :icon="icon" class="text-button" @click="$emit('click')">
    <div slot="body" class="body">
      <div class="icon">
        <div class="image" :class="icon" v-if="icon"></div>
      </div>
      <span>{{ text }}</span>
    </div>
  </fat-button>
</template>

<script lang="ts">
import Vue from 'vue';
import FatButton from './FatButton.vue';

export default Vue.extend({
  name: 'elements-buttons-fat-text',
  components: {
    FatButton
  },
  data: () => ({
    state: 'base',
  }),
  props: {
    color: String,
    icon: String,
    text: String
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";

.text-button {
  width: 100%;

  .body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .icon {
      width: 36px;
      height: 36px;
      justify-content: flex-end;
    }

    span {
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: $white;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
</style>
