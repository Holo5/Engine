<template>
  <div class="room-select-model">
    <div class="arrow left" @click="previousModel"></div>
    <div class="in" ref="models">
      <room-creation-model v-for="(model, i) in models" :model="model" :loop-iteration="i"></room-creation-model>
    </div>
    <div class="arrow right" @click="nextModel"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import RoomCreationModel from "./Models/Model.vue";
import {models} from "./RoomModels";

export default Vue.extend({
  name: 'navigator-create-room-models',
  components: {
    RoomCreationModel,
  },
  computed: {
    ...mapState('roomCreation', ['modelIndex']),
  },
  data: () => ({
    models: models
  }),
  watch: {
    modelIndex(newModelIndex) {
      this.$refs.models.style.marginLeft = newModelIndex <= 0 ? '43px' : '-' + (19.5 / 2 + 160 * newModelIndex + 53 * (newModelIndex - 1)) + 'px';
    },
  },
  methods: {
    previousModel() {
      this.setModel(this.modelIndex <= 0 ? this.models.length - 1 : this.modelIndex - 1);
    },
    nextModel() {
      this.setModel(this.modelIndex >= this.models.length - 1 ? 0 : this.modelIndex + 1);
    },
    setModel(index: number) {
      this.$store.commit('roomCreation/setModel', { index: index, modelName: this.models[index].model });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";

.room-select-model {
  width: 100%;
  height: 180px;
  background-image: url('~/app/game-interface/softy/assets/images/room-creation-bg.png');
  border-radius: $medium-border-radius;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  flex-wrap: nowrap;
  white-space: nowrap;

  .arrow {
    width: 25px;
    height: 40px;
    background-color: $black;
    position: absolute;
    top: calc(137px / 2 - 40px / 2);
    border-radius: $big-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    cursor: pointer;
    transition: 150ms ease-in-out opacity;
    z-index: 999;

    &.disabled {
      opacity: 0.3;
      cursor: auto;
    }

    &:not(.disabled):hover {
      opacity: 0.8;
    }

    &::after {
      content: '';
      margin-left: -2px;

      @include itf-icon(6px, 16px, -47px, -56px);
    }

    &.left {
      left: 30px;
    }

    &.right {
      left: calc(300px - 30px - 25px);

      &::after {
        transform: rotate(180deg);
        margin-left: 2px;
      }
    }
  }

  .in {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 180px;
    overflow: hidden;
    align-items: center;
    white-space: nowrap;
    transition: 150ms ease-in-out margin-left;
    margin-left: 43px;
  }
}
</style>
