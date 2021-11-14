<template>
  <checkbox-group
      label="Autoriser tout les animaux à manger"
      :defaultValue="allowPetsEat"
      model="allowPetsEat"
      @update="update"
  ></checkbox-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import CheckboxGroup from "../../../../../Elements/Inputs/CheckboxGroup.vue";

export default Vue.extend({
  name: "settings-section-allow-pets-eat",
  components: {
    CheckboxGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    allowPetsEat: {
      get() {
        return this.roomSettingsData.allowPetsEat;
      },
      set(value: number|boolean) {
        if (typeof value === 'number') {
          value = value === 1;
        }

        this.$store.commit('roomSettings/setAllowPetsEat', value);
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
