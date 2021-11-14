<template>
  <quantity-group
      label="Distance minimale d'écoute du tchat"
      :defaultValue="chatDistance"
      model="chatDistance"
      :min="0" :step="1" :max="50"
      @update="update"
  ></quantity-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import QuantityGroup from "../../../../../Elements/Inputs/QuantityGroup.vue";

export default Vue.extend({
  name: "settings-input-chat-distance",
  components: {
    QuantityGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    chatDistance: {
      get() {
        return this.roomSettingsData.chatDistance;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setChatDistance', value);
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
