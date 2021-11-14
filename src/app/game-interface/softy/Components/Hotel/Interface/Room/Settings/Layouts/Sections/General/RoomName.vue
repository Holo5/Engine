<template>
  <input-group
      label="Nom de l'appart"
      :defaultValue="roomName"
      model="roomName"
      @update="update"
  ></input-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import InputGroup from "../../../../../Elements/Inputs/InputGroup.vue";

export default Vue.extend({
  name: "settings-section-room-name",
  components: {
    InputGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    roomName: {
      get() {
        return this.roomSettingsData.name;
      },
      set(value: string) {
        this.$store.commit('roomSettings/setRoomName', value);
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
