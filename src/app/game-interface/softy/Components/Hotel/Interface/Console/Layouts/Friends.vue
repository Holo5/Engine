<template>
  <div class="layout friends" v-show="currentLayout === 'friends'">
    <div class="friends-lists">
      <div class="title">
        <informations-group :class="{ 'margin-top': paginatedOnline.users.length > 0 }" :label="'Amis en ligne (' + online.length + ')'" v-if="offline.length > 0"></informations-group>
        <div class="pagination">
          <div class="page" v-for="(step, i) in paginatedOnline.steps">
            <span :class="{ selected: i === currentOnlinePage }" @click="changeOnlinePage(i)">{{ step[0] }} - {{ step[1] }}</span>
          </div>
        </div>
      </div>
      <console-friend v-for="friend in online" :friend="friend" @updateChecked="updateChecked"></console-friend>
      <div class="title">
        <informations-group :class="{ 'margin-top': paginatedOffline.users.length > 0 }" :label="'Amis hors ligne (' + offline.length + ')'" v-if="offline.length > 0"></informations-group>
        <div class="pagination">
          <div class="page" v-for="(step, i) in paginatedOffline.steps">
            <span :class="{ selected: i === currentOfflinePage }" @click="changeOfflinePage(i)">{{ step[0] }} - {{ step[1] }}</span>
          </div>
        </div>
      </div>
      <console-friend v-for="friend in paginatedOffline.users" :friend="friend" @updateChecked="updateChecked"></console-friend>
    </div>
    <div :class="['buttons', { disabled }]">
      <modules-button color="#4c78d8" icon="message" :text="'Envoyer un message groupé (' + this.friendsSelected.length + ')'" @click.native="sendGroupMessage"></modules-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters, mapState} from "vuex";
import InformationsGroup from "../../Elements/Inputs/InformationsGroup.vue";
import {Friend} from "../../../../../../../core/logic/console/Friend";
import ConsoleFriend from "./User/Friend.vue";
import ModulesButton from "../../Elements/Buttons/Fat/IconButton.vue";
import {Configuration} from "../../../../../../../../conf";

export default Vue.extend({
  name: "console-friends-layout",
  components: {
    ModulesButton,
    ConsoleFriend,
    InformationsGroup
  },
  computed: {
    ...mapState('console', ['currentLayout']),
    ...mapGetters('console', ['friendsUnduplicated']),
    online() {
      if (this.friendsUnduplicated.length > 0) {
        return this.friendsUnduplicated.filter((friend: Friend) => friend.isOnline);
      }

      return [];
    },
    offline() {
      if (this.friendsUnduplicated.length > 0) {
        return this.friendsUnduplicated.filter((friend: Friend) => !friend.isOnline);
      }

      return [];
    },
    disabled() {
      return this.friendsSelected.length <= 0;
    },
    paginatedOnline() {
      const paginatedUsers = this.paginate(this.online, this.currentOnlinePage);

      return {
        users: paginatedUsers,
        steps: this.resolveStepsFromPaginated(paginatedUsers, this.online)
      };
    },
    paginatedOffline() {
      const paginatedUsers = this.paginate(this.offline, this.currentOfflinePage);

      return {
        users: paginatedUsers,
        steps: this.resolveStepsFromPaginated(paginatedUsers, this.offline)
      };
    }
  },
  data: () => ({
    friendsSelected: [],
    currentOnlinePage: 0,
    currentOfflinePage: 0,
  }),
  methods: {
    changeOfflinePage(page: number) {
      this.currentOfflinePage = page;
    },
    changeOnlinePage(page: number) {
      this.currentOnlinePage = page;
    },
    paginate(array: Friend[], currentPage: number) {
      const maxUsersPerPage = Configuration.console.maxUsersDisplayedPerPage;

      return array.slice(currentPage * maxUsersPerPage, (currentPage + 1) * maxUsersPerPage);
    },
    resolveStepsFromPaginated(array: Friend[], originalArray: Friend[]) {
      const paginated: [number, number][] = [];
      let min = 1;

      for (let i = 0; i < array.length; i++) {
        let max = min + Configuration.console.maxUsersDisplayedPerPage - 1;

        if (max > originalArray.length) {
          max = originalArray.length;
        }

        paginated.push([min, max]);

        min = max;

        if (max === originalArray.length) {
          break;
        }
      }

      return paginated;
    },
    updateChecked(args: { checked: boolean, friend: Friend }) {
      if (args.checked && !this.friendsSelected.includes(args.friend)) {
        this.friendsSelected.push(args.friend);
      } else {
        this.friendsSelected = this.friendsSelected.filter((friend: Friend) => friend.id !== args.friend.id);
      }
    },
    sendGroupMessage() {
      this.$store.commit('messenger/setGroupMessageDisplayed', true);
      this.$store.commit('messenger/setGroupMessageFriends', this.friendsSelected);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";

.friends-lists {
  height: 365px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-right: 5px;
  margin-top: 12px;
  padding-left: 10px;
  margin-left: -10px;
  width: calc(100% + 10px);

  .informations-group,
  .title {
    margin-bottom: 0;

    &.margin-top {
      margin-top: 10px;
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .pagination {
      display: flex;
      flex-direction: row;
      align-items: center;

      .page {
        margin-left: 10px;
        cursor: pointer;

        span {
          font-size: 11px;
          opacity: 0.7;
          font-weight: 600;

          &.selected {
            opacity: 1;
            color: $purple;
          }
        }
      }
    }
  }
}

.buttons {
  margin-top: 12px;
  transition: 200ms ease-in-out all;

  &.disabled {
    opacity: 0.5;
    filter: grayscale(100%);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 999;
    }
  }
}
</style>
