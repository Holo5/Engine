<template>
  <select-group
      label="Qui peut expulser"
      :list="kickStateStates"
      :defaultValue="kickStateName"
      model="kickState"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "kick-state",
  components: {
    SelectGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    kickState: {
      get() {
        return this.roomSettingsData.kickState;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setKickState', value.id);
      },
    },
    kickStateName() {
      const kickState = this.kickStateStates.filter((state: { id: number, name: string }) => state.id === this.kickState)[0];

      return kickState ? kickState.name : this.kickStateStates[0].name;
    },
  },
  data: () => ({
    kickStateStates: [
      {id: 0, name: 'Tout le monde (déconseillé)' },
      {id: 1, name: 'Les ayants-droits uniquement' },
      {id: 2, name: 'Personne' },
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>