<template>
  <div id="hotel-base">
    <holo-beta-login v-if="!logged"></holo-beta-login>
    <base-loader v-if="logged && gameLoading"></base-loader>
    <base-main v-if="logged"></base-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseLoader from './Hotel/Interface/Base/Loading.vue';
import BaseMain from './Hotel/Main.vue';
import HoloBetaLogin from './Hotel/Interface/Beta/Login.vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    HoloBetaLogin,
    BaseLoader,
    BaseMain
  },
  computed: {
    ...mapState('beta', ['logged']),
    ...mapState('loadingOverlay', ['gameLoading'])
  }
});
</script>

<style lang="scss">
@import "../assets/sass/variables";
@import "../assets/sass/colors";
@import "../assets/sass/mixins";
@import "../assets/sass/fonts";
@import "../assets/sass/tooltip";
@import "../assets/sass/normalize";
@import "../assets/sass/vue-transitions";

#hotel-base {
  background-color: #000000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
