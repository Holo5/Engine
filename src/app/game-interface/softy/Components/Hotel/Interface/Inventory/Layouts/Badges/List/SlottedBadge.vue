<template>
  <div class="badge" @click="unslot">
    <img :src="badge.renderer" :alt="badge.textName"/>
    <small-icon-button icon="close" class="remove" color="transparent"></small-icon-button>
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
  methods: {
    unslot() {
      this.$store.dispatch('inventory/unslotBadges', this.badge);
    },
  },
});
</script>

<style lang="scss">
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/variables";

.badge {
  img {
    transition: 200ms ease-in-out all;
  }

  .remove {
    cursor: pointer;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    opacity: 0;
  }

  &:hover {
    .remove {
      opacity: 1;
    }

    img {
      opacity: .2;
    }
  }
}
</style>
