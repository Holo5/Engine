<template>
  <select-group
      :list="thickStates"
      :defaultValue="wallThicknessName"
      model="wallThickness"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-wall-thickness",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    wallThickness: {
      get() {
        return this.roomSettingsData.wallThickness;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setWallThickness', value.id);
      },
    },
    wallThicknessName() {
      const thick = this.thickStates.filter((state: { id: number, name: string }) => state.id === this.wallThickness)[0];

      return thick ? thick.name : this.thickStates[0].name;
    },
  },
  data: () => ({
    thickStates: [
      {id: -2, name: 'Murs très fins'},
      {id: -1, name: 'Murs fins'},
      {id: 0, name: 'Murs normaux'},
      {id: 1, name: 'Murs épais'},
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>