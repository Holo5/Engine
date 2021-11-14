<template>
  <div class="hotel-shop-page">
    <div class="body">
      <div class="texts">
<!--        <p v-html="actualPage.texts[0]"></p>-->
<!--        <p v-html="actualPage.texts[1]"></p>-->
        <p>Les groupes sont indisponibles pour le moment</p>
      </div>
<!--      <div class="down">-->
<!--        <div class="select">-->
<!--          <search-bar :baseList="myGroups" :placeholder="'Sélectionne un groupe'" :type="'dropdown'"></search-bar>-->
<!--        </div>-->
<!--        <shop-button :icon="'forum'" :text="'Acheter un terminal de forum'" @click.native="start"></shop-button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ShopTitle from '../Modules/Title.vue';
import ShopButton from '../../Elements/Buttons/Fat/IconButton.vue';
import SearchBar from '../../Elements/SearchBar.vue';
import {mapState} from "vuex";
import {Configuration} from '../../../../../../../../conf';

export default Vue.extend({
  name: 'shop-layout-create-group-forum',
  computed: {
    ...mapState('catalog', ['actualPage']),
    ...mapState('clientData', ['groups']),
    iconUrl(): string {
      return (icon) => Configuration.images.catalogDomain + icon + '.gif';
    }
  },
  components: {
    ShopTitle,
    ShopButton,
    SearchBar
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

    ::v-deep p {
      margin-bottom: 10px;
      font-size: 13px;
      line-height: 18px;

      b, a, i, font {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
      }
    }

    .down {
      display: flex;
      flex-direction: column;
      align-items: center;

      .select {
        z-index: 99;
        display: flex;
        flex-direction: row;
        width: 330px;

        .search-bar.hotel-search-bar {
          border-radius: $medium-border-radius;
        }
      }

      .button {
        z-index: 1;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        border-radius: $medium-border-radius;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 200ms ease-in-out background-color;
        background-color: $green;
        padding: 0 20px 0 64px;
        white-space: nowrap;
        margin-top: 12px;
        width: 330px;

        span {
          text-transform: uppercase;
          font-weight: bold;
          color: $white;
          font-size: 14px;
          padding: 10px 0;
        }

        &::after {
          @include itf-icon(44px, 50px, -110px, -51px);

          position: absolute;
          content: "";
          left: 10px;
          top: -7px;
          animation: pop 1.2s ease-in-out infinite;
          transition: 500ms ease-in-out top;
        }

        &:hover {
          background-color: lighten($green, 5);
        }
      }
    }
  }
}
</style>
