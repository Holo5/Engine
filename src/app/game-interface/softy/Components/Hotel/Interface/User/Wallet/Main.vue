<template>
  <div id="user-wallet-main">
    <div class="left" v-if="currencies !== undefined">
      <wallet-value type="credit" :amount="currencies.credits"></wallet-value>
      <wallet-value type="diamond" :amount="currencies.diamonds"></wallet-value>
      <wallet-value type="ducket" :amount="currencies.duckets"></wallet-value>
    </div>
    <div class="right">
      <icon-button icon="leave"></icon-button>
      <icon-button icon="question"></icon-button>
      <icon-button icon="cog"></icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WalletValue from './Value.vue';
import IconButton from '../../Elements/Buttons/Small/IconButton.vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'user-wallet',
  computed: {
    ...mapState('clientData', ['currencies']),
  },
  components: {
    WalletValue,
    IconButton
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

#user-wallet-main {
  background-color: $winter;
  border-radius: $big-border-radius;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  width: 210px;

  .left {
    background-color: $white;
    border-radius: $big-border-radius;
    padding-top: 11px;
    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
    width: calc(100% - 45px);
  }

  .right {
    width: 45px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 9px 0 5px 0;

    &::v-deep .hotel-icon-button {
      margin-bottom: 4px;
    }
  }
}
</style>
