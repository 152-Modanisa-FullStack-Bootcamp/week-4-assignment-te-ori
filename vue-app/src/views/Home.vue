<template>
  <div class="main">
    <video-box
      v-for="video in getVideos"
      :key="video.id"
      :video="video"
    ></video-box>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import VideoBox from "@/components/VideoBox";

export default {
  components: {
    VideoBox,
  },
  computed: {
    ...mapGetters(["getVideos"])
  },
};
</script>

<style>
.main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>