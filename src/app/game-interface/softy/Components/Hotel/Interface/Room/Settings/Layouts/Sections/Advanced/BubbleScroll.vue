<template>
  <select-group
      :list="bubbleScrollState"
      :defaultValue="bubbleScrollName"
      model="bubbleScroll"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-bubble-scroll",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    bubbleScroll: {
      get() {
        return this.roomSettingsData.bubbleScroll;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setBubbleScroll', value.id);
      },
    },
    bubbleScrollName() {
      const bubbleScroll = this.bubbleScrollState.filter((state: { id: number, name: string }) => state.id === this.bubbleScroll)[0];

      return bubbleScroll ? bubbleScroll.name : this.bubbleScrollState[0].name;
    },
  },
  data: () => ({
    bubbleScrollState: [
      {id: 0, name: 'Défilement rapide' },
      {id: 1, name: 'Défilement normal' },
      {id: 2, name: 'Défilement lent' },
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>