<template>
  <select-group
      class="maxiZ"
      label="Catégorie de l'appart"
      :list="categoriesAvailable"
      :defaultValue="roomCategoryName"
      model="roomCategoryId"
      comparisonIndex="publicName"
      @update="update"
  ></select-group>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import SelectGroup from "../../../../../Elements/Inputs/SelectGroup.vue";
import {RoomCategory} from "../../../../../../../../../../core/logic/settings/RoomCategory";

export default Vue.extend({
  name: "settings-section-room-category",
  components: {
    SelectGroup,
  },
  computed: {
    ...mapState('roomSettings', ['roomSettingsData', 'categoriesAvailable']),
    roomCategoryId: {
      get() {
        return this.roomSettingsData.categoryId;
      },
      set(value: any) {
        this.$store.commit('roomSettings/setRoomCategoryId', value.id);
      },
    },
    roomCategoryName() {
      const category = this.categoriesAvailable.filter((category: RoomCategory) => category.id === this.roomCategoryId)[0];

      return category ? category.publicName : this.categoriesAvailable[0].publicName;
    },
  },
  methods: {
    update(args: { model: string, value: any }) {
      this[args.model] = args.value;
    },
  },
});
</script>

<style lang="scss" scoped>
.maxiZ {
  z-index: 99999;
}
</style>
