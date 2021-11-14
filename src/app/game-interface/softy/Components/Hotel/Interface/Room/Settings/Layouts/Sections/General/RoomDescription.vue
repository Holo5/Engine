<template>
  <input-group
      label="Description de l'appart"
      :defaultValue="roomDesc"
      model="roomDesc"
      @update="update"
  ></input-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import InputGroup from "../../../../../Elements/Inputs/InputGroup.vue";

export default Vue.extend({
  name: "settings-section-room-description",
  components: {
    InputGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    roomDesc: {
      get() {
        return this.roomSettingsData.description;
      },
      set(value: string) {
        this.$store.commit('roomSettings/setRoomDesc', value);
      },
    },
  },
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>
