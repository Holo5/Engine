<template>
  <checkbox-group
      label="Autoriser la présence d'animaux"
      :defaultValue="allowPets"
      model="allowPets"
      @update="update"
  ></checkbox-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import CheckboxGroup from "../../../../../Elements/Inputs/CheckboxGroup.vue";

export default Vue.extend({
  name: "settings-section-allow-pets",
  components: {
    CheckboxGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    allowPets: {
      get() {
        return this.roomSettingsData.allowPets;
      },
      set(value: number|boolean) {
        if (typeof value === 'number') {
          value = value === 1;
        }

        this.$store.commit('roomSettings/setAllowPets', value);
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
