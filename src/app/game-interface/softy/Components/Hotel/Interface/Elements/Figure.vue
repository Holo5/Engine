<template>
  <img :src="figureFinalRender" :style="size === 's' || size === 'small' ? 'width:35px;image-rendering:pixelated' : ''" alt=""/>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'holo-figure',
  props: {
    figure: String,
    headonly: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: Number,
      validator: (value: number) => value >= 0 && value <= 7,
      default: 2,
    },
    head_direction: {
      type: Number,
      validator: (value: number) => value >= 0 && value <= 7,
      default: 2,
    },
    size: {
      type: String,
      validator: (value: string) => ['l', 'large', 'n', 'normal', 's', 'small', 'big'].indexOf(value) !== -1,
      default: 'n',
    },
  },
  computed: {
    figureFinalRender(): string {
      const look_settings = [
        `figure=${this.figure}`,
        `headonly=${this.headonly ? 1 : 0}`,
        `direction=${this.direction}`,
        `head_direction=${this.head_direction}`,
        `size=${this.size == 's' || this.size == 'small' ? 'n' : this.size}`,
      ].join('&');

      return this.imager + look_settings; // TODO: Join with Holo5 avatarimager
    },
  },
  data: () => ({
    imager: 'https://www.habbo.fr/habbo-imaging/avatarimage?',
  }),
});
</script>
