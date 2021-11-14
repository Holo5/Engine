<template>
  <div class="hotel-shop-page-introduction">
    <module-title :title="actualPage.texts[1]" :icon="actualPage.images[1]" :paddingTop="true"></module-title>
    <div class="body" v-html="body"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ModuleTitle from '../Modules/Title.vue';
import {mapState} from "vuex";

export default Vue.extend({
  name: 'shop-layout-introduction',
  components: {
    ModuleTitle
  },
  computed: {
    ...mapState('catalog', ['actualPage']),
    body() {
      const texts = this.actualPage.texts.slice(2);

      texts[0] = texts[0].trim();

      return '<p>' + texts.join('</p><br><p>') + '</p>';
    }
  }
});
</script>

<style lang="scss">
.hotel-shop-page-introduction {
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  .body {
    display: flex;
    flex-direction: column;
    padding: 15px 8px;
    white-space: pre-wrap;

    p {
      margin-bottom: 10px;
      font-size: 13px;
      line-height: 18px;
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }

      b {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
      }
    }
  }
}
</style>
