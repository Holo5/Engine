<template>
  <div class="group checkbox-group">
    <label v-if="label">{{ label }}</label>
    <input type="checkbox" v-model="checked">
    <div :class="['yes-no', { reversed: reverseColor }]">
      <span class="yes" v-if="checked">{{ trueValue }}</span>
      <span class="no" v-if="!checked">{{ falseValue }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "checkbox-group",
  props: {
    label: {
      type: String,
      default: null,
    },
    model: String,
    reverseColor: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: [Boolean, Number],
      default: false,
    },
    trueValue: {
      type: String,
      default: 'Oui',
    },
    falseValue: {
      type: String,
      default: 'Non',
    },
  },
  data: () => ({
    checked: false,
  }),
  watch: {
    defaultValue: {
      handler(newValue, oldValue) {
        this.checked = newValue;
      },
      immediate: true,
    },
    checked(newValue, oldValue) {
      this.$emit('update', { model: this.model, value: newValue });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";

.checkbox-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  z-index: auto;
  width: 100%;

  label,
  .yes-no span {
    font-size: 13px;
    color: #666666;
    text-transform: uppercase;
    font-weight: bold;
  }

  label {
    margin-bottom: 7px;
  }

  .yes-no span {
    position: absolute;
    z-index: 999;
    pointer-events: none;
    left: 0;
    right: 0;
    bottom: 0;
    height: 35px;
    color: $red;
    text-align: center;
    line-height: 35px;

    &.yes {
      color: $green;
    }

    &.reversed {
      color: $green;

      &.yes {
        color: $red;
      }
    }
  }

  input[type="checkbox"] {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #fff;
    border-radius: $medium-border-radius;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    padding: 0 10px;
    height: 35px;
    cursor: pointer;
  }
}
</style>