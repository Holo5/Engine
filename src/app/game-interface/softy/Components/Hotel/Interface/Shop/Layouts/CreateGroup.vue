<template>
  <div class="hotel-shop-page">

    <div class="body">
      <div class="texts">
<!--        <p v-html="actualPage.texts[0]"></p>-->
<!--        <p v-html="actualPage.texts[1]"></p>-->
        <p>Les groupes sont indisponibles pour le moment</p>
      </div>
      <div class="down">
<!--        <shop-button icon="forum" text="Créer mon nouveau groupe"></shop-button>-->
        <img :src="iconUrl(actualPage.images[1])">
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ModuleTitle from '../Modules/Title.vue';
import ShopButton from '../../Elements/Buttons/Fat/IconButton.vue';
import {mapState} from "vuex";
import {Configuration} from '../../../../../../../../conf';

export default Vue.extend({
  name: 'shop-layout-create-group',
  computed: {
    ...mapState('catalog', ['actualPage']),
    iconUrl() {
      return (icon) => Configuration.images.catalogDomain + icon + '.gif';
    }
  },
  components: {
    ModuleTitle,
    ShopButton
  },
  methods: {
    start(): void {
      // TODO: create new group
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-shop-page {
  height: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  .body {
    display: flex;
    flex-direction: column;
    padding: 15px 8px;
    justify-content: space-between;
    height: 100%;

    .texts {
      p {
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 18px;

        b {
          font-weight: 600;
          font-size: 13px;
          line-height: 18px;
        }
      }
    }

    .down {
      display: flex;
      flex-direction: column;
      align-items: center;

      .button {
        width: auto!important;
        padding-left: 70px;
        padding-right: 20px;
      }

      img {
        margin: 15px 0;
      }
    }
  }
}
</style>
