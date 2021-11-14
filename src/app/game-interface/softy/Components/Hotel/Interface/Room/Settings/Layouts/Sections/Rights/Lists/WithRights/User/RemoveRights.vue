<template>
  <div class="user-line">
    <div class="btn">
      <small-icon-button icon="minus" color="#c53131" @click.native="removeRights(user)" v-tooltip="'Supprimer ses droits'"></small-icon-button>
    </div>
    <span>{{ user.username }}</span> <!-- TODO: open user profile -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SmallIconButton from "../../../../../../../../Elements/Buttons/Fat/SmallIconButton.vue";
import {User} from "../../../../../../../../../../../../../core/logic/permissions/User";

export default Vue.extend({
  name: "remove-rights-user",
  props: {
    user: User,
  },
  components: {
    SmallIconButton,
  },
  methods: {
    removeRights(user: User) {
      this.$store.dispatch('roomSettings/removeUserRights', user);
    },
  }
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
