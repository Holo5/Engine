<template>
  <inventory-preview>
    <div class="badges-preview" slot="preview">
      <div class="badges">
        <badge-slotted v-for="badge in badgesSlotted" :badge="badge"></badge-slotted>
        <div class="badge disabled" v-for="i in 5 - badgesSlotted.length"></div>
      </div>
      <div class="infos">
         <h1>Badges</h1>
        <span>1234 winwins</span> <!-- @todo get user winwins -->
      </div>
    </div>
  </inventory-preview>
</template>

<script lang="ts">
import Vue from 'vue';
import InventoryPreview from "../../Preview.vue";
import {mapGetters} from "vuex";
import BadgeSlotted from "./List/SlottedBadge.vue";

export default Vue.extend({
  name: 'badges-slot',
  computed: {
    ...mapGetters('inventory', ['badgesSlotted']),
  },
  components: {
    BadgeSlotted,
    InventoryPreview,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../assets/sass/colors";
@import "../../../../../../assets/sass/variables";

.badges-preview {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  .badges {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 18px;
    margin-top: 9px;
    margin-right: 4px;

    .badge {
      border: 2px solid #fff;
      border-radius: $medium-border-radius;
      width: 52px;
      height: 54px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 10px;

      &:nth-child(2) {
        margin-top: 40px;
      }

      &:nth-child(3),
      &:nth-child(5), {
        margin-top: -20px;
      }

      &.disabled {
        opacity: .3;
      }
    }
  }

  .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 10px 10px;

    h1 {
      font-size: 20px;
      color: #fff;
      text-align: center;
    }

    span {
      background-color: #fff;
      color: $black;
      font-size: 13px;
      margin-top: 5px;
      width: 100%;
      text-align: center;
      border-radius: $small-border-radius;
      font-weight: bold;
      padding: 5px;
    }
  }
}
</style>
