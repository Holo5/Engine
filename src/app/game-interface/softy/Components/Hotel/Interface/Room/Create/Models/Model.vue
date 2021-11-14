<template>
  <div class="model" :class="{ current: loopIteration === modelIndex }">
    <div class="icon">
      <img :src="'https://images.habbo.com/c_images/newroom/' + model.model + '.png'" :alt="model.model">
    </div>
    <div class="cases">
      <span>{{ model.cases }} cases</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'room-creation-model',
  computed: {
    ...mapState('roomCreation', ['modelIndex']),
  },
  props: {
    model: Object,
    loopIteration: Number,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.model {
  margin: 0 26.5px;
  width: 160px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  .icon {
    width: 160px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $big-border-radius;
    transition: 150ms ease-in-out background-color;
  }

  .cases {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 150ms ease-in-out opacity;
  }

  span {
    background-color: $green;
    line-height: 28px;
    font-size: 13px;
    text-transform: uppercase;
    padding: 0 15px;
    font-weight: bold;
    border-radius: $medium-border-radius;
    color: $white;
  }

  &.current {
    .icon {
      background-color: $green;
    }

    .cases {
      opacity: 1;
    }
  }
}
</style>