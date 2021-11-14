<template>
  <div id="hotel-notifications">
    <notifications-bloc v-for="notification in notifications" :notification="notification"></notifications-bloc>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NotificationsBloc from './Bloc.vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'notifications-main',
  components: {
    NotificationsBloc
  },
  computed: {
    ...mapState('notification', ['notifications'])
  }
});
</script>

<style lang="scss">
#hotel-notifications {
  width: 210px;
}
</style>
