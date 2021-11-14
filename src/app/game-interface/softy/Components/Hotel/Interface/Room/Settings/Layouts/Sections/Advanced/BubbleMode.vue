<template>
  <select-group
      :list="bubbleModeStates"
      :defaultValue="bubbleModeName"
      model="bubbleMode"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-bubble-mode",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    bubbleMode: {
      get() {
        return this.roomSettingsData.bubbleMode;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setBubbleMode', value.id);
      },
    },
    bubbleModeName() {
      const bubbleMode = this.bubbleModeStates.filter((state: { id: number, name: string }) => state.id === this.bubbleMode)[0];

      return bubbleMode ? bubbleMode.name : this.bubbleModeStates[0].name;
    },
  },
  data: () => ({
    bubbleModeStates: [
      {id: 0, name: 'Affichage libre (les bulles peuvent passer)' },
      {id: 1, name: 'Affichage ligne par ligne (ancien)' },
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>