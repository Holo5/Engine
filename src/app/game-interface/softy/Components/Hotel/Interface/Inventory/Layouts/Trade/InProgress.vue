<template>
  <div class="in-progress" v-if="isVisible">
    <div class="state">
      <span>Échange en cours</span>
      <small>Avec {{ username }}</small>
    </div>
    <div class="buttons">
      <small-icon-button @click.native="back" icon="prev" text="Revenir à l'échange" :color="'#ee867b'"></small-icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import SmallIconButton from "../../../Elements/Buttons/Fat/SmallIconButton.vue";

export default Vue.extend({
  name: 'inventory-trade-in-progress',
  components: {
    SmallIconButton,
  },
  computed: {
    ...mapState('trade', ['tradeEnabled', 'username']),
    ...mapState('inventory', ['currentLayout']),
    isVisible(): boolean {
      return this.tradeEnabled && this.currentLayout !== 'items';
    },
  },
  methods: {
    back(): void {
      this.$store.commit('inventory/setLayout', 'items');
    },
  },
});
</script>

<style lang="scss" scoped>
.in-progress {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  margin-top: 15px;

  .state {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
      font-size: 20px;
    }

    small {
      font-size: 14px;
      opacity: 0.6;
      margin-top: 2px;
    }
  }

  .small-icon-button {
    padding-right: 15px;
  }
}
</style>