<template>
  <select-group
      :list="thickStates"
      :defaultValue="floorThicknessName"
      model="floorThickness"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-floor-thickness",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    floorThickness: {
      get() {
        return this.roomSettingsData.floorThickness;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setFloorThickness', value.id);
      },
    },
    floorThicknessName() {
      const thick = this.thickStates.filter((state: { id: number, name: string }) => state.id === this.floorThickness)[0];

      return thick ? thick.name : this.thickStates[0].name;
    },
  },
  data: () => ({
    thickStates: [
      {id: -2, name: 'Sols très fins'},
      {id: -1, name: 'Sols fins'},
      {id: 0, name: 'Sols normaux'},
      {id: 1, name: 'Sols épais'},
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>