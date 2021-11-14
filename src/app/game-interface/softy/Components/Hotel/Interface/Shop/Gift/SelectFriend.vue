<template>
  <div class="select-friend">

    <div class="input username">
      <input type="text" v-model="friendUsername" placeholder="Pseudo de ton ami">
      <div class="users" v-if="occurrencesFound">
        <span v-for="(user, i) in occurrencesFound" :key="i" @click="setUser(user.username)" v-html="user.fakeUsername"></span>
      </div>
      <div class="users" v-if="occurrencesFound === 'none'">
        <span class="none">Aucun ami trouvé</span>
      </div>
    </div>

    <div class="input message">
      <textarea ref="content" v-model="content" placeholder="Écris ton message ici..." @keypress="watchChanges($event)" maxlength="130"></textarea>
      <i>- {{ username }}</i>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from "vuex";
import { Friend } from "../../../../../../../../game/logic/console/Friend";
export default Vue.extend({
  name: 'gift-select-friend',
  computed: {
    ...mapState('clientData', ['username']),
    ...mapState('console', ['friends']),
    ...mapState('catalog', ['friendName', 'giftContent']),
    friendUsername: {
      get(): string {
        return this.friendName
      },
      set(friendName: string) {
        this.friendNameChanges(friendName);
        this.$store.commit('catalog/setFriendName', friendName);
      }
    },
    content: {
      get(): string {
        return this.giftContent
      },
      set(content: string) {
        this.$store.commit('catalog/setGiftContent', content);
      }
    }
  },
  data: () => ({
    occurrencesFound: false,
    runWatcher: true,
    timer: null,
  }),
  methods: {
    friendNameChanges(friendName: string): void {
      clearTimeout(this.timer);
      const normalizedFriendName = friendName.toLowerCase().trim();
      if (!this.runWatcher) {
        this.runWatcher = true;
      } else if (normalizedFriendName === '') {
        this.occurrencesFound = false;
      } else {
        this.timer = setTimeout(() => {
          const occurrences = this.friends.filter((friend: Friend) => friend.username.toLowerCase().includes(normalizedFriendName));
          if (occurrences.length > 0) {
            this.occurrencesFound = occurrences.map((user: Friend) => {
              user.fakeUsername = user.username.replace(new RegExp(normalizedFriendName, 'ig'), '<b>$&</b>');
              return user;
            });
          } else {
            this.occurrencesFound = false;
          }
        }, 500);
      }
    },
    setUser(username: string): void {
      this.runWatcher = false;
      this.occurrencesFound = false;
      this.friendUsername = username;
    },
    watchChanges(event: KeyboardEvent): void {
      const textarea = this.$refs.content as HTMLTextAreaElement;
      textarea.style.height = '38px';
      textarea.style.height = textarea.scrollHeight > 38 ? textarea.scrollHeight + 'px' : '38px';
      if (['NumpadEnter', 'Enter'].includes(event.code) || event.key === 'enter') {
        if (this.content.trim().length > 0) {
          event.preventDefault();
        } else {
          this.content = '';
        }
        event.preventDefault();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/mixins";
.select-friend {
  background-color: $yellow;
  padding: 0 10px 10px 10px;
  border-radius: $medium-border-radius;
  display: flex;
  flex-direction: column;
  .input {
    margin-top: 10px;
    width: 100%;
    border-radius: $small-border-radius;
    background-color: $white;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    input,
    textarea {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 10px 9px 14px;
      line-height: 1.4;
      resize: none;
      font-size: 13px;
      word-wrap: break-word;
    }
    &.username {
      z-index: 2;
      &::after {
        @include itf-icon(16px, 16px, -93px, -19px);
        content: '';
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .users {
        width: 100%;
        max-height: 95px;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 31px;
        background-color: $white;
        overflow: auto;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2);
        span {
          width: 100%;
          line-height: 1.4;
          border-top: 1px solid $grey-light-light-light;
          font-size: 13px;
          padding: 7px 5px 6px 14px;
          &:not(.none) {
            cursor: pointer;
            ::v-deep b {
              font-weight: bold;
              line-height: 1.4;
              font-size: 13px;
            }
            &:hover {
              color: $orange;
              b {
                color: $orange;
              }
            }
          }
        }
      }
    }
    &.message {
      z-index: 1;
      textarea {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        height: 38px;
      }
      i {
        width: 100%;
        font-size: 13px;
        text-align: right;
        padding: 0 10px 10px 0;
        float: right;
      }
    }
  }
}
</style>
