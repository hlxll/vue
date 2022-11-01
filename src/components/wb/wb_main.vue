<template>
  <div style="position: relative">
    <div style="width: 100%; height: 330px; overflow: hidden">
      <video
        autoplay='autoplay'
        loop="loop"
        preload="true"
        muted="muted"
        src="https://a.sinaimg.cn/mintra/pic/2112130543/weibo_login.mp4"
        class="video"
        id="video"
      ></video>
    </div>
    <div class="videoText">
      <div style="text-align: center" class="wbLog">
        <wbLog></wbLog>
      </div>
      <div
        class="videoInput"
        :style="{ border: focus ? '1px solid #ff8200' : '1px solid transparent' }"
      >
        <div class="sousuoIcon">
          <img src="../../../public/image/sousuo.svg" />
        </div>
        <input
          class="sousuoInput"
          type="default"
          @focusout="f_inputFocus(false)"
          @focusin="f_inputFocus(true)"
        />
        <button class="sousuoBtn" @click="f_pushMsg()">搜索</button>
      </div>
    </div>
  </div>
</template>
<script>
import wbLog from "./wb_log.vue";
export default {
  name: "wbMain",
  components: {
    wbLog,
  },
  data() {
    return {
      ws: "",
      focus: false,
    };
  },
  methods: {
    f_pushMsg: function () {
      this.ws.send("我是"+this.$route.query.user);
    },
    f_inputFocus: function (event) {
      this.focus = event;
    },
  },
  mounted() {
    try {
      //推送数据
      this.ws = new WebSocket("ws://127.0.0.1:5000");
      this.ws.onopen = (e) => {
        this.ws.send(this.$route.query.user);
      };
      this.ws.onmessage = (e) => {
        console.log(e);
      }; 
    } catch (err) {
      console.log(err)
    }
    
  },
};

</script>
<style scoped>
.video {
  transform: translateX(-16%);
  height: 330px;
}
.videoText {
  width: 700px;
  height: 140px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -70px;
  margin-left: -350px;
}
.wbLog {
  height: 57px;
  width: 130px;
  margin: auto;
}
.videoInput {
  display: flex;
  border-radius: 24px;
  width: 700px;
  height: 48px;
  background-color: #fff;
  margin-top: 35px;
}
.sousuoIcon {
  width: 56px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sousuoIcon > img {
  width: 22px;
  height: 22px;
}
.sousuoInput {
  height: 48px;
  width: 564px;
  padding: 0;
  border: 0;
  border: none !important;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
}
.sousuoBtn {
  background-color: #ff8200;
  text-align: center;
  line-height: 48px;
  width: 80px;
  padding: 0;
  border-bottom-right-radius: 24px;
  border-top-right-radius: 24px;
  border: 0;
  font-size: 20px;
  color: #ffffff;
}
</style>
