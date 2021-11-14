<template>
  <div class="hotel-shop-page">
    <div class="top">
      <item-pres-goto :type="'prev'" @click.native="prevItem()"></item-pres-goto>
      <item-pres-item :category="category" :item="currentItem" :count="itemsCount"></item-pres-item>
      <item-pres-goto :type="'next'" @click.native="nextItem()"></item-pres-goto>
    </div>
    <div class="middle">
      <items-list ref="itemsBloc" class="left" :items="fakeItems" :selectedItemIndex="selectedItemIndex" :itemsPerLine="3"></items-list>
      <div class="trophy right">
        <div class="material">
          <span>Matière</span>
          <div class="materials">
            <div class="material gold" @click="changeMaterial('gold')" :class="{ active: currentMaterial === 'gold' }"></div>
            <div class="material silver" @click="changeMaterial('silver')" :class="{ active: currentMaterial === 'silver' }"></div>
            <div class="material bronze" @click="changeMaterial('bronze')" :class="{ active: currentMaterial === 'bronze' }"></div>
          </div>
        </div>
        <textarea class="text-in" maxlength="300" v-model="content" placeholder="Écris un doux message en cliquant ici"></textarea>
      </div>
    </div>
    <div :class="['down-buttons', { disabled: selectedItemIndex <= -1 }]">
      <shop-button :color="'#f2b701'" :text="'Offrir'" @click.native="offer"></shop-button>
      <div class="quantity">
        <icon-button :icon="'minus'" @click.native="removeItem()" :type="'square'"></icon-button>
        <input type="number" max="100" min="1" step="1" v-model="itemsCount">
        <icon-button :icon="'plus'" @click.native="addItem()" :type="'square'"></icon-button>
      </div>
      <shop-button :icon="'duck'" :text="'Acheter'" @click.native="buy"></shop-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemPresGoto from '../Modules/ItemPres/Goto.vue';
import ItemPresItem from '../Modules/ItemPres/Item.vue';
import ItemsList from '../Modules/List/ItemsList.vue';
import ShopButton from '../../Elements/Buttons/Fat/IconButton.vue';
import IconButton from '../../Elements/Buttons/Small/IconButton.vue';

export default Vue.extend({
  name: 'shop-layout-trophies',
  props: {
    category: Object,
  },
  components: {
    ItemPresGoto,
    ItemPresItem,
    ItemsList,
    ShopButton,
    IconButton
  },
  computed: {
    currentItem(): HoloInterface.Shop.Item {
      return this.fakeItems[this.selectedItemIndex];
    },
    // TODO: Put real items, replace this fckin var by real and remove it
    // Warning, fakeitems have some references in this file
    fakeItems(): Array<HoloInterface.Shop.Item> {
      return [
        ...this.category.itempage.items,
        ...this.category.itempage.items,
        ...this.category.itempage.items,
      ];
    },
  },
  data: () => ({
    currentMaterial: 'gold',
    content: '',
    itemsCount: 1,
    selectedItemIndex: -1,
    changeEvent: undefined as undefined | String,
  }),
  watch: {
    itemsCount: {
      handler(value: number): void {
        this.itemsCount = value < 100 ? (value > 1 ? value : 1) : 100;
      },
    },
  },
  methods: {
    showItem(index: number): void {
      this.selectedItemIndex = index;
      this.changeEvent = 'clicked';
    },
    removeItem(): void {
      this.itemsCount--;
    },
    addItem(): void {
      this.itemsCount++;
    },
    prevItem(): void {
      this.changeEvent = 'not-clicked';

      if (this.selectedItemIndex - 1 < -1) {
        this.selectedItemIndex = this.fakeItems.length - 1;
      } else {
        this.selectedItemIndex--;
      }
    },
    nextItem(): void {
      this.changeEvent = 'not-clicked';

      if (this.selectedItemIndex + 1 <= this.fakeItems.length - 1) {
        this.selectedItemIndex++;
      } else {
        this.selectedItemIndex = -1;
      }
    },
    buy(): void {
      // TODO: Buy item
    },
    offer(): void {
      this.$root.$emit('show-shop-gift', this.fakeItems[this.selectedItemIndex], this.itemsCount);
    },
    changeMaterial(material: string): void {
      this.currentMaterial = material;

      // TODO: change material
    },
  },
  mounted(): void {
    this.$root.$emit('shop-enable-navigation');
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-shop-page {
  display: flex;
  flex-direction: column;
  width: 100%;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -15px;
    width: calc(100% + 30px);
  }

  .middle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left {
      width: 197px !important;
      margin-right: 15px;
    }

    .right {
      width: calc(100% - 197px - 15px);
      height: 130px;
      margin-top: 15px;

      &.trophy {
        display: flex;
        flex-direction: column;

        .material {
          width: 100%;
          background-color: $grey-light;
          padding: 9px 10px 9px 13px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-radius: $medium-border-radius;

          span {
            color: $white;
            font-size: 15px;
            text-transform: uppercase;
          }

          .materials {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .material {
              width: 22px;
              height: 22px;
              cursor: pointer;
              border: 1px solid rgba(0, 0, 0, 0.3);
              border-radius: $small-border-radius;
              transition: 200ms ease-in-out border-color;

              &.active {
                border-color: $white;
              }

              &.gold {
                background-color: #e7a629;
              }

              &.silver {
                background-color: #adadad;
              }

              &.bronze {
                background-color: #c47c47;
              }

              &:not(:first-child) {
                margin-left: 7px;
              }
            }
          }
        }

        textarea.text-in {
          resize: none;
          padding: 10px 13px 8px 14px;
          line-height: 1.5;
          height: 100%;
          font-size: 13px;
          font-weight: 500;
          border-radius: 12px;
          background-color: $white;
          margin-top: 15px;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .down-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0 0 15px;
    opacity: 1;
    transition: 200ms ease-in-out opacity, 200ms ease-in-out filter;
    filter: grayscale(0);

    .quantity {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      background-color: #fff;
      border-radius: $medium-border-radius;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
      padding: 0 10px;
      margin: 0 15px;

      input {
        width: 39px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        padding: 10px 0 9px 0;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }

      .button {
        margin: 8.5px 0;
      }
    }

    &.disabled {
      opacity: 0.5;
      filter: grayscale(100%);

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 999;
      }

      &::v-deep .button::after {
        animation: none;
      }
    }
  }
}
</style>
