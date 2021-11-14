<template>
  <div class="group quantity-group">
    <label v-if="label !== null">{{ label }}</label>
    <div class="quantity">
      <small-icon-button icon="minus" :opacity="1" @click.native="remove" type="square"></small-icon-button>
      <input disabled type="number" :max="max" :min="min" :step="step" v-model="inputModel">
      <small-icon-button icon="plus" :opacity="1" @click.native="add" type="square"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SmallIconButton from '../Buttons/Small/IconButton.vue';

export default Vue.extend({
  name: "quantity-group",
  props: {
    label: {
      type: String,
      default: null,
    },
    model: String,
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 200,
    },
    step: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: Number,
      default: undefined,
    },
  },
  components: {
    SmallIconButton,
  },
  watch: {
    defaultValue(newValue, oldValue) {
      this.inputModel = newValue;
    },
    inputModel(newValue, oldValue) {
      this.$emit('update', { model: this.model, value: newValue });
    },
  },
  data: () => ({
    inputModel: 0,
  }),
  mounted() {
    this.inputModel = this.defaultValue ? this.defaultValue : this.min;
  },
  methods: {
    remove() {
      this.inputModel = this.inputModel <= this.min ? this.min : this.inputModel - this.step;
    },
    add() {
      this.inputModel = this.inputModel >= this.max ? this.max : this.inputModel + this.step;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";

.quantity-group {
  display: flex;
  flex-direction: column;
  z-index: auto;
  width: 100%;
  margin-bottom: 12px;

  label {
    font-size: 13px;
    color: #666666;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 7px;
  }

  .quantity {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #fff;
    border-radius: $medium-border-radius;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    padding: 0 10px;

    input {
      width: 39px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      padding: 10px 0 9px 0;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    .button {
      margin: 8.5px 0;
    }
  }
}
</style>
