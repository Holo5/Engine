<template>
  <div class="group select-group">
    <span class="label" v-if="label">{{ label }}</span>
    <search-bar
        :baseList="list"
        :searchKey="comparisonIndex"
        :placeholder="placeholder"
        :type="type"
        :defaultValue="defaultValue"
        @updateValue="updateCategorySelected"
    ></search-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "../SearchBar.vue";

export default Vue.extend({
  name: "select-group",
  components: {
    SearchBar
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    list: Array,
    model: String,
    type: {
      type: String,
      default: 'dropdown',
    },
    comparisonIndex: {
      type: String,
      default: 'value',
    },
    placeholder: {
      type: String,
      default: 'Sélectionne dans une liste...',
    },
    defaultValue: {
      default: null,
    },
  },
  methods: {
    updateCategorySelected(value: string) {
      this.$emit('update', {
        model: this.model,
        value: this.list.filter((line: any) => line[this.comparisonIndex] === value)[0],
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";

.select-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  z-index: 999;
  width: 100%;

  span.label {
    font-size: 13px;
    color: #666666;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 7px;
  }

  input {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #fff;
    border-radius: $medium-border-radius;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    padding: 0 12px;
    height: 35px;
    font-size: 13px;
    color: #666666;
  }
}
</style>