<template>
  <quantity-group
      label="Joueurs max"
      :defaultValue="usersMax"
      model="usersMax"
      :min="5" :step="5" :max="usersMaxCeiling"
      @update="update"
  ></quantity-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import QuantityGroup from "../../../../../Elements/Inputs/QuantityGroup.vue";

export default Vue.extend({
  name: "settings-input-users-max",
  components: {
    QuantityGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    usersMax: {
      get() {
        return this.roomSettingsData.usersMax;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setUsersMax', value);
      },
    },
    usersMaxCeiling() {
      return this.roomSettingsData.usersMaxCeiling;
    },
  },
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>
