<template>
  <div class="group">
    <informations-group :label="'Utilisateurs bannis (' + totalUsersBanned + ')'" text="Voici la liste des utilisateurs bannis dans cet appartement. Clique sur la croix à côté pour débannir l'utilisateur."></informations-group>
    <div class="loading" v-if="loading">Chargement</div>
    <div class="users" v-if="!loading && totalUsersBanned > 0">
      <div class="user-line" v-for="user in usersBanned">
        <span>{{ user.username }}</span> <!-- TODO: open user profile -->
        <div class="btn">
          <small-icon-button icon="small-close" color="#c53131" @click.native="unban(user)" v-tooltip="'Débannir'"></small-icon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationsGroup from "../../../../../Elements/Inputs/InformationsGroup.vue";
import {mapState} from "vuex";
import SmallIconButton from "../../../../../Elements/Buttons/Fat/SmallIconButton.vue";
import {UserBanned} from "../../../../../../../../../../core/logic/moderation/UserBanned";

export default Vue.extend({
  name: "users-banned",
  components: {
    SmallIconButton,
    InformationsGroup
  },
  computed: {
    ...mapState('roomSettings', ['usersBanned']),
    loading() {
      return typeof this.usersBanned === 'undefined';
    },
    totalUsersBanned() {
      return this.loading ? 0 : this.usersBanned.length;
    },
  },
  mounted() {
    this.$store.dispatch('roomSettings/getUsersBanned');
  },
  methods: {
    unban(user: UserBanned) {
      this.$store.dispatch('roomSettings/unbanUser', user);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../../assets/sass/variables";

.users {
  display: flex;
  flex-direction: column;

  .user-line {
    flex: 1;
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    justify-content: space-between;
    padding: 5px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 2px;
      font-size: 14px;
      font-weight: bold;
    }

    .btn {
      ::v-deep .small-icon-button {
        min-height: 28px !important;
        border-radius: $big-border-radius;

        .button {
          margin: 0 5px 0 5px;
        }
      }
    }
  }
}

.loading {
  line-height: 40px;
  text-align: center;
  margin-bottom: 12px;
  margin-top: -6px;
  color: #666;
  font-size: 13px;
  animation: 1s ease-in-out bounce infinite;
}

@keyframes bounce {
  50% {
    opacity: 0;
  }

  0%, 100% {
    opacity: 1;
  }
}
</style>
