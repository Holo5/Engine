<template>
  <div class="user-profile-badge">
    <img :src="badge.renderer" :alt="badge.textName"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Badge} from "../../../../../../../../../core/logic/badge/Badge";
import SmallIconButton from "../../../../Elements/Buttons/Fat/SmallIconButton.vue";

export default Vue.extend({
  name: 'badge-slotted',
  components: {
    SmallIconButton,
  },
  props: {
    badge: Badge,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.user-profile-badge {
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
</style>