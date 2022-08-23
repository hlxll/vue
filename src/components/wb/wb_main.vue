<template>
  <div>
    <video
      id="video"
      src="https://a.sinaimg.cn/mintra/pic/2112130543/weibo_login.mp4"
      class="video"
    ></video>
  </div>
</template>
<script>
export default {
  methods: {
    playVideo: function () {
      let video = document.getElementById("video");
      video.play();
    },
  },
  mounted() {
    this.playVideo();
  },
};
</script>
<style scoped>
.video {
  width: 100%;
  height: 250px;
}
</style>
