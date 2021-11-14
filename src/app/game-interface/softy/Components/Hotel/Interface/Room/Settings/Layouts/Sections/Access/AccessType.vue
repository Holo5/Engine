<template>
  <div class="access-type">
    <div class="radio-group">
      <input type="radio" value="0" name="access-type" id="radio-open" v-model.number="accessType">
      <label for="radio-open">Ouvert à tous</label>
    </div>
    <div class="radio-group">
      <input type="radio" value="1" name="access-type" id="radio-doorbell" v-model.number="accessType">
      <label for="radio-doorbell">Les visiteurs doivent sonner</label>
    </div>
    <div class="radio-group">
      <input type="radio" value="3" name="access-type" id="radio-invisible" v-model.number="accessType">
      <label for="radio-invisible">Invisible sans les droits</label>
    </div>
    <div class="radio-group">
      <input type="radio" value="2" name="access-type" id="radio-password" v-model.number="accessType">
      <label for="radio-password">Mot de passe requis</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: "settings-section-access-type",
  computed: {
    ...mapState('roomSettings', ['roomSettingsData']),
    accessType: {
      get() {
        return this.roomSettingsData.accessType;
      },
      set(value: number) {
        this.$store.commit('roomSettings/setAccessType', value);
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

<style lang="scss" scoped>
@import "../../../../../../../../assets/sass/colors";
@import "../../../../../../../../assets/sass/variables";

.access-type {
  width: 100%;
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;

  .radio-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 30px;
    margin-bottom: 6px;

    label {
      font-size: 13px;
      color: #555;
      line-height: 20px;
      padding-left: 9px;
      cursor: pointer;
    }

    input[type="radio"] {
      width: 20px;
      height: 20px;
      background-color: $white;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);

      &:checked {
        background-image: url(#{$sprite-icons-url});
        background-repeat: no-repeat;
        background-position: -151px -94px;
        background-color: $green;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>