<template>
  <elements-draggable-box class="news-box" v-if="display">
    <span slot="title">News</span>
    <div class="body" slot="body">
      <news v-for="n in news" :news="n"></news>
    </div>
  </elements-draggable-box>
</template>

<script lang="ts">
import Vue from 'vue';
import ElementsDraggableBox from '../Elements/Box/DraggableBox.vue';
import News from './News.vue';
import {mapState} from 'vuex';

export default Vue.extend({
  name: 'NewsBox',
  components: {
    ElementsDraggableBox,
    News,
  },
  methods: {
    closeBox(): void {
      this.$store.commit('news/closeBox');
    },
  },
  computed: {
    ...mapState('news', ['display', 'news'])
  }
});
</script>

<style lang="scss" scoped>
.news-box {
  top: 60px;
  left: 20px;
  padding-right: 5px;
  padding-bottom: 10px;
  position: fixed;
  width: 330px;

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 500px;
    overflow: auto;
  }
}
</style>
