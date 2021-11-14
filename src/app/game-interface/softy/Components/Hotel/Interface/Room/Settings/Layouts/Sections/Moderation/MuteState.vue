<template>
  <select-group
      label="Qui peut rendre muet"
      :list="muteStateStates"
      :defaultValue="muteStateName"
      model="muteState"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "mute-state",
  components: {
    SelectGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    muteState: {
      get() {
        return this.roomSettingsData.muteState;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setMuteState', value.id);
      },
    },
    muteStateName() {
      const muteState = this.muteStateStates.filter((state: { id: number, name: string }) => state.id === this.muteState)[0];

      return muteState ? muteState.name : this.muteStateStates[0].name;
    },
  },
  data: () => ({
    muteStateStates: [
      {id: 0, name: 'Personne' },
      {id: 1, name: 'Les ayants-droits uniquement' },
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>