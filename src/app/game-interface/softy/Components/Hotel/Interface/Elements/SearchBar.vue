<template>
  <div :class="['search-bar', 'hotel-search-bar', type]">
    <input type="text" class="input-search-value" v-model="searchValue" :placeholder="placeholder" @click="toggleItems">
    <div class="items" ref="items" v-if="occurrences && occurrences !== 'none'">
      <span
          class="item"
          v-for="(item, i) in occurrences"
          :key="i"
          @click="setSearchedValue(item[searchKey])"
          v-html="item.fakeItemName"
      ></span>
    </div>
    <div class="items" v-if="occurrences === 'none'">
      <span class="none">Aucune occurrence trouvée</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'elements-search-bar',
  props: {
    baseList: Array,
    searchKey: {
      type: String,
      default: 'name',
    },
    placeholder: {
      type: String,
      default: 'Rechercher quelque chose...',
    },
    type: {
      type: String,
      default: 'text',
    },
    defaultValue: {
      default: null,
    },
  },
  computed: {
    list() {
      return this.baseList.map((item: any) => {
        item.fakeItemName = item[this.searchKey];

        return item;
      });
    },
  },
  data: () => ({
    searchValue: '',
    timer: null as any,
    occurrences: false as Boolean | String | Array<any>,
    watchChanges: true,
  }),
  methods: {
    toggleItems() {
      if (this.type == 'dropdown') {
        if (this.occurrences == 'none' || !this.occurrences) {
          this.occurrences = this.list;
        } else {
          this.occurrences = false;
        }
      }
    },
    setSearchedValue(value: string) {
      this.searchValue = value;
      this.occurrences = false;
      this.watchChanges = false;
    },
  },
  mounted() {
    if (this.defaultValue !== null) {
      this.setSearchedValue(this.defaultValue);
    }
  },
  watch: {
    defaultValue(newValue, oldValue) {
      this.setSearchedValue(newValue);
    },
    searchValue(searchedValue: string) {
      clearTimeout(this.timer);
      this.$emit('updateValue', searchedValue);

      searchedValue = searchedValue.toLowerCase().trim();

      if (!this.watchChanges) {
        this.watchChanges = true;
      } else if (searchedValue == '') {
        this.occurrences = false;
      } else {
        this.timer = setTimeout(() => {
          let occurrences = this.list.filter((item: any) => item[this.searchKey].toLowerCase().includes(searchedValue));

          this.occurrences = occurrences.length > 0 ? occurrences.map((item: any) => {
            item.fakeItemName = item[this.searchKey].replace(new RegExp(searchedValue, 'ig'), '<b>$&</b>');

            return item;
          }) : 'none';
        }, 500);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/mixins";

.search-bar.hotel-search-bar {
  border-radius: $medium-border-radius;
  background-color: $white;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  width: 100%;

  input.input-search-value {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px 9px 14px;
    line-height: 1.4;
    resize: none;
    font-size: 13px;
    word-wrap: break-word;
  }

  &.text::after {
    @include itf-icon(16px, 16px, -93px, -19px);
  }

  &.dropdown {
    input.input-search-value {
      cursor: pointer;
    }

    &::after {
      @include itf-icon(18px, 18px, -92px, -68px);
    }
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .items {
    width: 100%;
    max-height: 95px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 33px;
    background-color: $white;
    overflow: auto;
    border-radius: $medium-border-radius;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);

    span.item,
    span.none {
      width: 100%;
      line-height: 1.4;
      border-top: 1px solid $grey-light-light-light;
      font-size: 13px;
      padding: 7px 5px 6px 14px;

      &:first-child {
        border-top: none;
      }

      &.none {
        color: $red;
      }

      &:not(.none) {
        cursor: pointer;

        ::v-deep b {
          font-weight: bold;
          line-height: 1.4;
          font-size: 13px;
        }

        &:hover {
          color: $orange;

          ::v-deep b {
            color: $orange;
          }
        }
      }
    }
  }
}
</style>
