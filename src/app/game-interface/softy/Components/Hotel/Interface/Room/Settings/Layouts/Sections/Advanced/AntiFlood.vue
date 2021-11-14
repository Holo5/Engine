<template>
  <select-group
      :list="antiFloodSettingsStates"
      :defaultValue="antiFloodSettingsName"
      model="antiFloodSettings"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-anti-flood-settings",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    antiFloodSettings: {
      get() {
        return this.roomSettingsData.antiFloodSettings;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setAntiFlood', value.id);
      },
    },
    antiFloodSettingsName() {
      const antiFloodSettings = this.antiFloodSettingsStates.filter((state: { id: number, name: string }) => state.id === this.antiFloodSettings)[0];

      return antiFloodSettings ? antiFloodSettings.name : this.antiFloodSettingsStates[0].name;
    },
  },
  data: () => ({
    antiFloodSettingsStates: [
      {id: 0, name: 'Protection anti-flood extra' },
      {id: 1, name: 'Protection anti-flood standard' },
      {id: 2, name: 'Protection anti-flood minimale' },
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>