<template>
  <li class="page-tree">
    <span @click="clickOnLinkEvent" :class="classes">
      <img v-if="page.icon" :src="'https://swf.habbocity.me/c_images/catalogue/icon_' + page.icon + '.png'"/> {{ page.caption }}
    </span>
    <ul class="child" v-if="page.catalogPages.length > 0 && childDisplayed">
      <shop-tree-navigation v-for="childPage in page.catalogPages" :page="childPage" :depth="depth + 1"></shop-tree-navigation>
    </ul>
  </li>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {CatalogPage} from "../../../../../../../core/logic/catalog/CatalogPage";
import {mapState} from "vuex";

export default Vue.extend({
  name: 'shop-tree-navigation',
  props: {
    page: Object as PropType<CatalogPage>,
    depth: Number,
    displayed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    childDisplayed: false,
  }),
  computed: {
    ...mapState('catalog', ['actualPage']),
    classes() {
      return {
        sub: this.page.catalogPages.length > 0,
        active: this.childDisplayed,
        selected: this.page.id === this.actualPage.id,
      };
    },
  },
  methods: {
    clickOnLinkEvent() {
      if (this.page.catalogPages.length > 0) {
        this.childDisplayed = !this.childDisplayed;
      } else {
        this.$store.commit('catalog/setActualCatalogCaption', this.page.caption);
        this.$store.dispatch('catalog/itemsRequest', this.page.id);
      }
    },
  },
  watch: {
    page() {
      this.childDisplayed = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.page-tree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  white-space: nowrap;

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: $white;
    white-space: nowrap;
    padding: 5px 0 5px 12px;
    transition: 200ms ease-in-out color;
    font-size: 12px;
    font-weight: 500;
    width: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 9px;
      right: 5px;
      border-radius: 4px;
      background-color: transparent;
      transition: 100ms ease-in-out background-color;
      z-index: -1;
    }

    &.selected::before,
    &:hover::before {
      background-color: $yellow;
    }

    &.sub {
      &::after {
        content: '';
        position: absolute;
        border: 5px solid transparent;
        border-top-color: $grey;
        right: 6px;
        top: 9px;
        height: 0;
        width: 0;
        transform: rotate(-90deg);
      }

      &.active::after {
        transform: rotate(0);
        top: 12px;
        right: 10px;
      }
    }

    img {
      margin-right: 8px;
    }
  }

  .child {
    width: 100%;
    padding-left: 5px;
    border-left: 2px solid $grey;
  }
}
</style>
