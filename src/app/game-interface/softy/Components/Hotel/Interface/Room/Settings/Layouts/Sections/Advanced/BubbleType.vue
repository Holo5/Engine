<template>
  <select-group
      :list="bubbleTypeStates"
      :defaultValue="bubbleTypeName"
      model="bubbleType"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-bubble-type",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    bubbleType: {
      get() {
        return this.roomSettingsData.bubbleType;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setBubbleType', value.id);
      },
    },
    bubbleTypeName() {
      const bubbleType = this.bubbleTypeStates.filter((state: { id: number, name: string }) => state.id === this.bubbleType)[0];

      return bubbleType ? bubbleType.name : this.bubbleTypeStates[0].name;
    },
  },
  data: () => ({
    bubbleTypeStates: [
      {id: 0, name: 'Grandes bulles'},
      {id: 1, name: 'Bulles simples'},
      {id: 2, name: 'Petites bulles'},
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>