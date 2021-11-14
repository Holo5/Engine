<template>
  <v-popover trigger="hover">
    <div :class="['badge-selectable', { slc: selected }]" @click="preview">
      <img :src="inventoryBadge.renderer" alt=""/>
    </div>
    <div class="badge" slot="popover">
      <b>{{ inventoryBadge.textName }}</b>
      <span>{{ inventoryBadge.textDesc }}</span>
    </div>
  </v-popover>
</template>

<script lang="ts">
import Vue from 'vue';
import {Badge} from "../../../../../../../../../core/logic/badge/Badge";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'inventory-badge-selectable',
  computed: {
    ...mapState('inventory', ['currentBadge']),
    selected(): boolean {
      return this.currentBadge?.name === this.inventoryBadge.name;
    },
  },
  props: {
    inventoryBadge: {
      type: Badge,
      required: true,
    }
  },
  methods: {
    preview() {
      this.$store.dispatch('inventory/selectBadge', this.inventoryBadge);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.badge-selectable {
  border: 2px solid rgba(102, 102, 102, 0.2);
  width: 50px;
  height: 52.6px;
  margin: 0 4.8px 5px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: $medium-border-radius;
  cursor: pointer;
  background-color: transparent;
  transition: 150ms ease-in-out background-color;

  img {
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
  }

  &:hover,
  &.slc {
    background-color: rgba(102, 102, 102, 0.3);
  }

  &:nth-child(7n+7) {
    margin-right: 0;
  }
}
</style>
