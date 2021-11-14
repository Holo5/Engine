<template>
  <div class="group set-password" v-if="accessType === 2">
    <input-group
        label="Mot de passe de l'appartement"
        model="password"
        :defaultValue="password"
        @update="update"
    ></input-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import InputGroup from "../../../../../Elements/Inputs/InputGroup.vue";

export default Vue.extend({
  name: "settings-section-room-password",
  components: {
    InputGroup
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData', 'roomPassword']),
    password: {
      get() {
        return this.roomPassword;
      },
      set(value: string) {
        this.$store.commit('roomSettings/setRoomPassword', value);
      },
    },
    accessType() {
      return this.roomSettingsData.accessType;
    }
  },
  watch: {
    accessType(newValue, oldValue) {
      if (newValue !== 2 && oldValue === 2) {
        this.update({ model: 'password', value: '' });
      }
    },
  },
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../../assets/sass/colors";

.set-password {
  margin-bottom: 15px;
  width: calc(100% + 30px);
  margin-left: -15px;
  display: flex;
  background-color: darken($winter, 5);
  flex-direction: column;
  padding: 15px 15px 6px 15px;
  margin-top: -8px;
}
</style>

