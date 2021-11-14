<template>
  <checkbox-group
      label="Passage à travers"
      :defaultValue="allowWalkthrough"
      model="allowWalkthrough"
      trueValue="Activé" falseValue="Désactivé"
      @update="update"
  ></checkbox-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import CheckboxGroup from "../../../../../Elements/Inputs/CheckboxGroup.vue";

export default Vue.extend({
  name: "settings-section-allow-walkthrough",
  components: {
    CheckboxGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    allowWalkthrough: {
      get() {
        return this.roomSettingsData.allowWalkthrough;
      },
      set(value: number|boolean) {
        if (typeof value === 'boolean') {
          value = value ? 1 : 0;
        }

        this.$store.commit('roomSettings/setAllowWalkthrough', value);
      },
    }
  },
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>
