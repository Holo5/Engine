<template>
  <checkbox-group
      :defaultValue="hideWalls"
      model="hideWalls"
      trueValue="Murs visibles" falseValue="Murs invisibles"
      :reverseColor="true"
      @update="update"
  ></checkbox-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import CheckboxGroup from "../../../../../Elements/Inputs/CheckboxGroup.vue";

export default Vue.extend({
  name: "settings-section-hide-walls",
  components: {
    CheckboxGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    hideWalls: {
      get() {
        return this.roomSettingsData.hideWalls;
      },
      set(value: number|boolean) {
        if (typeof value === 'boolean') {
          value = value ? 1 : 0;
        }

        this.$store.commit('roomSettings/setWallsInvisible', value);
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
