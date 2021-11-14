<template>
  <div class="hotel-shop-page">
    <module-title :title="'Promouvoir ton appart'" :icon="$config.APP_URL + 'assets/images/shop/promote-header.png'"
                  :paddingTop="true"></module-title>
    <div class="body">
      <b class="mini-desc-line">Mets ton appart en avant pendant 120 minutes.</b>
      <div class="form">
        <div class="list first">
          <search-bar :baseList="categories" :placeholder="'Thème de l\'évènement'" :type="'dropdown'"></search-bar>
        </div>
        <div class="list">
          <search-bar :baseList="userRooms" :placeholder="'Sélectionne un appart'" :type="'dropdown'"></search-bar>
        </div>
        <div class="input">
          <input type="text" v-model="eventName" placeholder="Nom de l'évènement">
        </div>
        <div class="input">
          <!-- TODO: get real maxlength in habbo -->
          <textarea maxlength="300" v-model="eventContent" placeholder="Description de l’événement"></textarea>
        </div>
        <div class="input">
          <div class="button buy" @click="promote">
            <span>Lancer la promotion</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {fakeCategories, fakeUserRooms} from '../../../../Fakes/shop';
import ModuleTitle from '../Modules/Title.vue';
import SearchBar from '../../Elements/SearchBar.vue';

export default Vue.extend({
  name: 'shop-layout-promote-room',
  props: {
    category: Object,
  },
  components: {
    ModuleTitle,
    SearchBar
  },
  data: () => ({
    eventContent: '',
    eventName: '',
    categorySelected: -1,
    roomSelected: -1,
    categories: fakeCategories,
    userRooms: fakeUserRooms,
  }),
  mounted(): void {
    this.$root.$emit('shop-enable-navigation');
  },
  methods: {
    promote(): void {
      // TODO: Launch promote
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-shop-page {
  width: calc(100% - 15px);
  height: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  .body {
    padding: 15px 0 0 0;

    b.mini-desc-line {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }

    .list {
      margin-top: 10px;
      z-index: 4;

      &.first {
        z-index: 9;
      }
    }

    .input {
      width: 100%;
      margin-top: 10px;
      z-index: 2;

      input {
        background-color: $white;
        width: 100%;
        border-radius: $small-border-radius;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        line-height: 35px;
        padding: 0 15px;
        font-size: 14px;
      }

      textarea {
        background-color: $white;
        width: 100%;
        border-radius: $small-border-radius;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        resize: none;
        padding: 12px 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 99px;
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
        width: 100%;

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
