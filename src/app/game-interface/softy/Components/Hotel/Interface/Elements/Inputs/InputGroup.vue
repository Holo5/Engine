<template>
  <div :class="['group input-group', { error }]">
    <label>{{ label }} <span v-if="error">Obligatoire</span></label>
    <input :type="inputType" v-model="inputModel" :placeholder="placeholder" :maxlength="maxlength">
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "input-group",
  props: {
    label: String,
    model: String,
    inputType: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'Écrire ici...',
    },
    maxlength: {
      type: Number,
      default: 255,
    },
    defaultValue: {
      type: String,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    inputModel: '',
  }),
  mounted() {
    this.inputModel = this.defaultValue ? this.defaultValue : '';
  },
  watch: {
    inputModel(newValue, oldValue) {
      this.$emit('update', { model: this.model, value: newValue });
    },
    defaultValue(newValue, oldValue) {
      this.inputModel = newValue;
    },
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  z-index: auto;
  width: 100%;

  label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px;
    color: #666666;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 7px;

    span {
      font-size: 13px;
      color: $red;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  input {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #fff;
    border-radius: $medium-border-radius;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    padding: 0 15px;
    height: 35px;
    font-size: 13px;
    color: #666666;
  }

  &.error {
    input {
      background-color: lighten($red, 40);
    }
  }
}
</style>