<template>
  <div class="popups">
    <popup v-for="alert in alerts" :alert="alert"></popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Popup from "./Popup.vue";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'popups',
  computed: {
    ...mapState('popupAlert', ['alerts']),
  },
  components: {
    Popup,
  },
});
</script>

<style lang="scss" scoped>
.popups {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
</style>