<template>
  <div :class="['message', `type-${message.messageType}`]">
    <div class="text">
      <p>{{ message.message }}</p>
    </div>
    <span class="details" v-if="!sameAuthor">Le {{ message.date.toLocaleString() }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Message} from "../../../../../../../core/logic/messenger/Message";

export default Vue.extend({
  name: "messenger-discussion-message",
  props: {
    message: Message,
    sameAuthor: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.message {
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }

  .text {
    display: flex;
    width: 100%;

    p,
    p::before {
      max-width: 75%;
      padding: 10px 14px;
      border-radius: $medium-border-radius;
      line-height: 1.5;
      font-size: 13px;
      font-weight: 500;
      word-break: break-word;
    }

    p::before {
      padding: 0;
      border-bottom: 1px solid $white;
      border-radius: 0;
    }
  }

  .details {
    font-size: 10px;
    width: 100%;
    margin-top: 5px;
    color: $grey-light;
  }

  &.type-received {
    .text {
      flex-direction: row;

      p {
        background-color: $grey-light-light;
      }
    }
  }

  &.type-sent {
    .text {
      flex-direction: row-reverse;

      p {
        background-color: $blue;
        color: $white;
      }
    }

    .details {
      text-align: right;
    }
  }

  &.type-system {
    margin-bottom: 10px;

    .text p {
      max-width: 100% !important;
      background-color: $white;
      font-style: italic;
    }
  }

  &.type-error {
    margin-bottom: 10px;

    .text p {
      max-width: 100% !important;
      background-color: $red;
      font-style: italic;
      color: $white;
    }
  }

  &.type-invitation {
    margin-bottom: 10px;

    .text p {
      &::before {
        content: 'Invitation reçue:';
        font-style: italic;
        color: $white;
        margin-right: 5px;
      }

      max-width: 100% !important;
      background-color: $orange;
      font-style: italic;
      color: $white;
    }
  }
}
</style>
