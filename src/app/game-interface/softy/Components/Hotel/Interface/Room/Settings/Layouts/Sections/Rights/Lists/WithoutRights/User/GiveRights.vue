<template>
  <div class="user-line">
    <div class="btn">
      <small-icon-button icon="plus" @click.native="giveRights(friend)"></small-icon-button>
    </div>
    <span>{{ friend.username }}</span> <!-- TODO: open user profile -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SmallIconButton from "../../../../../../../../Elements/Buttons/Fat/SmallIconButton.vue";
import {Friend} from "../../../../../../../../../../../../../core/logic/console/Friend";

export default Vue.extend({
  name: "give-rights-user",
  props: {
    friend: Friend,
  },
  components: {
    SmallIconButton,
  },
  methods: {
    giveRights(friend: Friend) {
      this.$store.dispatch('roomSettings/giveRights', friend.id, { root: true });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../../../../../assets/sass/variables";

.user-line {
  flex: 0 33.3%;
  display: flex;
  flex-direction: row;
  padding: 5px 5px 5px 0;
  max-width: 33%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 8px;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .btn {
    ::v-deep .small-icon-button {
      min-height: 28px !important;
      border-radius: $big-border-radius;
      box-shadow: none;

      .button {
        margin: 0 5px 0 5px;
      }
    }
  }
}
</style>
