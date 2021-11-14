<template>
  <draggable-box class="hotel-box-room-creation" v-if="roomCreationDisplayed">
    <span slot="title">Création d'appart</span>
    <div slot="body" class="content">
      <navigator-create-room-models></navigator-create-room-models>
      <input-group
          input-type="text"
          model="roomName"
          label="Nom de l'appart"
          placeholder="Mon super appart"
          :error="roomNameError"
          @update="updateRoomName"
      ></input-group>
      <input-group
          input-type="text"
          model="roomDesc"
          label="Description"
          placeholder="Le plus beau de tous !"
          @update="updateRoomDesc"
      ></input-group>
      <select-group
          class="super-z"
          model="categorySelected"
          label="Catégorie de l'appart"
          :list="categoriesAvailable"
          :default-value="roomCategoryName"
          placeholder="Sélectionne une catégorie"
          comparisonIndex="publicName"
          @update="updateRoomCategory"
      ></select-group>
      <quantity-group
          label="Joueurs max"
          :defaultValue="usersMax"
          model="usersMax"
          :min="5" :step="5" :max="100"
          @update="updateUsersMax"
      ></quantity-group>
      <select-group
          label="Qui a le droit de troquer ?"
          :list="tradeStates"
          :defaultValue="tradeStates[0].name"
          model="tradeState"
          comparisonIndex="name"
          @update="updateTradeState"
      ></select-group>
      <div class="input-group">
        <fat-icon-button :text="'Créer mon appart !'" :icon="'create-room'" @click.native="createRoom"></fat-icon-button>
      </div>
    </div>
  </draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import DraggableBox from '../../Elements/Box/DraggableBox.vue';
import FatIconButton from '../../Elements/Buttons/Fat/IconButton.vue';
import SmallIconButton from '../../Elements/Buttons/Small/IconButton.vue';
import SearchBar from '../../Elements/SearchBar.vue';
import NavigatorCreateRoomModels from './Models.vue';
import InputGroup from "../../Elements/Inputs/InputGroup.vue";
import SelectGroup from "../../Elements/Inputs/SelectGroup.vue";
import QuantityGroup from "../../Elements/Inputs/QuantityGroup.vue";
import CheckboxGroup from "../../Elements/Inputs/CheckboxGroup.vue";
import {tradeStates} from "./TradeStates";
import {RoomCategory} from "../../../../../../../core/logic/settings/RoomCategory";

interface IUpdateEventArgs {
  model: string;
  value: any;
}

export default Vue.extend({
  name: 'navigator-create-room',
  computed: {
    ...mapState('roomCreation', ['roomCreationDisplayed', 'categoriesAvailable', 'categoryId', 'tradeState', 'roomNameError']),
    roomCategoryId: {
      get() {
        return this.categoryId;
      },
      set(value: any) {
        this.$store.commit('roomCreation/setRoomCategoryId', value.id);
      },
    },
    roomCategoryName() {
      if (this.categoriesAvailable !== null) {
        const category = this.categoriesAvailable.filter((category: RoomCategory) => category.id === this.roomCategoryId)[0];

        return category ? category.publicName : this.categoriesAvailable[0].publicName;
      }

      return null;
    },
    tradeState: {
      get() {
        return this.tradeState;
      },
      set(value: any) {
        this.$store.commit('roomCreation/setTradeState', value.id);
      },
    },
  },
  components: {
    CheckboxGroup,
    QuantityGroup,
    SelectGroup,
    InputGroup,
    NavigatorCreateRoomModels,
    DraggableBox,
    FatIconButton,
    SmallIconButton,
    SearchBar
  },
  data: () => ({
    usersMax: 50,
    tradeAllowed: false,
    categorySelected: 1,
    tradeStates,
  }),
  methods: {
    updateRoomName(args: IUpdateEventArgs) {
      this.$store.commit('roomCreation/setRoomNameError', false);
      this.$store.commit('roomCreation/setRoomName', args.value);
    },
    updateRoomDesc(args: IUpdateEventArgs) {
      this.$store.commit('roomCreation/setRoomDesc', args.value);
    },
    updateRoomCategory(args: IUpdateEventArgs) {
      this.roomCategoryId = args.value;
    },
    updateUsersMax(args: IUpdateEventArgs) {
      this.$store.commit('roomCreation/setUsersMax', args.value);
    },
    updateTradeState(args: IUpdateEventArgs) {
      this.$store.commit('roomCreation/setTradeState', args.value.id);
    },
    closeBox() {
      this.$store.commit('roomCreation/close');
    },
    createRoom() {
      this.$store.dispatch('roomCreation/create');
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.hotel-box-room-creation {
  width: 330px;
  top: 140px;
  left: calc(50% - 330px / 2);

  .box-body {
    .content {
      padding: 0 15px 15px 15px;

      .super-z {
        z-index: 9999;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        margin-top: 12px;
        z-index: auto;
        width: 100%;
      }
    }
  }
}
</style>
