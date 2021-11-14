<template>
  <select-group
      label="Qui peut bannir"
      :list="banStateStates"
      :defaultValue="banStateName"
      model="banState"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "ban-state",
  components: {
    SelectGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    banState: {
      get() {
        return this.roomSettingsData.banState;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setBanState', value.id);
      },
    },
    banStateName() {
      const banState = this.banStateStates.filter((state: { id: number, name: string }) => state.id === this.banState)[0];

      return banState ? banState.name : this.banStateStates[0].name;
    },
  },
  data: () => ({
    banStateStates: [
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