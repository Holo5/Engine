<template>
  <select-group
      label="Qui a le droit de troquer ?"
      :list="tradeStates"
      :defaultValue="tradeStateName"
      model="tradeState"
      comparisonIndex="name"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";

export default Vue.extend({
  name: "settings-section-trade-state",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    tradeState: {
      get() {
        return this.roomSettingsData.tradeState;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setTradeState', value.id);
      },
    },
    tradeStateName() {
      const state = this.tradeStates.filter((state: { id: number, name: string }) => state.id === this.tradeState)[0];

      return state ? state.name : this.tradeStates[0].name;
    },
  },
  data: () => ({
    tradeStates: [
      {id: 1, name: 'Personne'},
      {id: 2, name: 'Le propriétaire et les ayants-droit uniquement'},
      {id: 3, name: 'Tout le monde'}
    ],
  }),
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>
