<template>
  <div class="users_in" :class="{
    'green': (usersIn < usersMax/2 && usersIn > 0),
    'orange': usersIn > usersMax/2 && usersIn < usersMax,
    'red': usersIn >= usersMax,
    'grey': usersIn <= 0
  }">
    {{ usersIn }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'navigator-room-plate-users-in',
  props: {
    usersIn: Number,
    usersMax: Number,
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/variables";

.users_in {
  float: left;
  width: 40px;
  border-radius: $medium-border-radius;
  height: 25px;
  line-height: 25px;
  margin: 5px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: $white;
  background-color: #bebebe;

  &.grey {
    background-color: #bebebe;
  }

  &.green {
    background-color: #65af64;
  }

  &.orange {
    background-color: #f18a2b;
  }

  &.red {
    background-color: #ea4646;
  }
}
</style>
