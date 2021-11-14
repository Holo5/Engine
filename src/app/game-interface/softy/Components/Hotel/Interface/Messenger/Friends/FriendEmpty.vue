<template>
  <div class="empty-friend">
    <div class="icon"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import HoloFigure from '../../Elements/Figure.vue';

export default Vue.extend({
  name: "messenger-list-friend-empty",
  components: {
    HoloFigure,
  },
  computed: {
    ...mapState('console', ['messengerMessagesFriends']),
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";
@import "../../../../../assets/sass/colors";

.empty-friend {
  z-index: 8;
  margin: 5px 10px 0 10px;
  width: 56px;
  height: 58px;
  border-radius: $medium-border-radius;
  transition: 200ms ease-in-out background-color;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($winter, 0.1);

  &:first-child {
    margin-top: 0;
  }

  .icon {
    @include itf-icon(25px, 31px, -84px, -36px);

    opacity: 0.3;
  }
}
</style>