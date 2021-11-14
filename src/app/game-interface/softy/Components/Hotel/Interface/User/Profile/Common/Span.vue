<template>
  <span class="user-profile-common-span" v-show="display">
    <span :class="['state', stateColor]" v-if="state"></span>
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'user-profile-span',
  props: {
    text: String,
    state: {
      type: Boolean,
      default: false
    },
    stateColor: {
      type: String,
      default: 'green'
    },
  },
  computed: {
    display() {
      return this.text !== '';
    },
  },
});
</script>

<style lang="scss" scoped>
.user-profile-common-span {
  background-color: #fff;
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 5px 8px;
  font-size: 12px;

  .state {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-top: 1px;
    margin-right: 5px;
    float: left;

    &.red {
      background-color: red;
    }

    &.green {
      background-color: green;
    }
  }
}
</style>