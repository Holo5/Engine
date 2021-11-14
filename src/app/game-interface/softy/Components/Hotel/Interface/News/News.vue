<template>
  <div class="news">
    <div class="caption" :style="'background-image: url(' + news.image + ')'">
      <div class="title">{{ news.title }}</div>
    </div>

    <div class="news-content">
      <span v-html="news.content"></span>

      <div class="ending">
        <div class="date">{{ news.ts }}</div>
        <div class="version">Version: {{ news.version }}</div>
      </div>
    </div>

    <div class="separator"><div class="size"></div></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'News',
  props: ['news']
});
</script>

<style lang="scss" scoped>
.news {
  width: 300px;

  .caption {
    border-radius: 5px;
    background-image: url("https://habborator.org/archive/topstory/general_2/TS_buildhotel.png");
    width: 300px;
    height: 187px;

    .title {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 10px;
      font-size: 14px;
      color: white;
    }
  }

  .news-content {
    margin-top: 5px;
    font-size: 12px;
    padding: 5px 10px;

    span {
      font-size: 12px;
    }

    .ending {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      .date {
        color: rgb(238, 184, 14);
        font-size: 12px;
        font-style: italic;
      }

      .version {
        color: #6B6B6B;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  .separator {
    width: 260px;
    margin: 20px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);

    .size {
      height: 5px;
    }
  }
}


</style>
