<template>
  <div class="group informations-group">
    <label>{{ label }}</label>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";

export default Vue.extend({
  name: "informations-group",
  props: {
    label: {
      type: String,
    },
    text: {
      type: [String, Boolean],
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";

.informations-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  z-index: auto;
  max-width: 388px;

  label {
    font-size: 13px;
    color: #666666;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 7px;
  }

  p {
    font-size: 13px;
    color: #555;
  }
}
</style>