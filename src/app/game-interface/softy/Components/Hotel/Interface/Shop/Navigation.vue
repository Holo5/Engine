<template>
  <div class="hotel-shop-navigation">
    <div v-for="(page, i) in catalogPages" :key="i">
      <div class="link" @click="openPage(i, page)" :class="{ active: current === i }">
        <div class="icon" v-if="page.icon">
          <img :src="'https://swf.habbocity.me/c_images/catalogue/icon_' + page.icon + '.png'"/>
        </div>
        {{ page.caption }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";
import {CatalogPage} from "../../../../../../core/logic/catalog/CatalogPage";

export default Vue.extend({
  name: 'shop-navigation',
  computed: {
    ...mapState('catalog', ['catalogPages']),
  },
  data: () => ({
    current: 0,
  }),
  methods: {
    openPage(i: number, page: CatalogPage) {
      this.current = i;

      this.$store.commit('catalog/setSecondLevelCategories', page.catalogPages);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";

.hotel-shop-navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0 0 -5px;
  flex-wrap: wrap;

  .link {
    margin-left: 5px;
    margin-top: 5px;
    border: 1px solid $grey;
    border-radius: $medium-border-radius;
    line-height: 30px;
    padding: 1.5px 10px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    color: $grey;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    transition: 200ms ease-in-out all;

    &:hover,
    &.active {
      background-color: lighten($grey, 53);
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 7px;
      height: 30px;
    }
  }
}
</style>
