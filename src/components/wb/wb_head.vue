<template>
  <div class="head">
    <button class="loginBtn">登录</button>
    <loginModal>
      <div class="loginModal">
        <p>请选择如下方式登录微博</p>
        <p>打开 微博手机APP - 我的 - 扫一扫</p>
      </div>
      <img :src="qrcodeUrl" />
    </loginModal>
  </div>
</template>
<script>
import loginModal from "./wb_modal.vue";
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
export default {
  name: "wbHead",
  components: {
    loginModal
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let state = reactive({
      qrcodeUrl: "",
      hasSession: true
    });
    let qrcodeUrl = ref("");
    const methods = {
      async initQrUrl() {
        await proxy.$axios
          .request({
            url: "/admin/qrCode"
          })
          .then(res => {
            state.qrcodeUrl = res.data;
            qrcodeUrl.value = res.data;
            // setInterval(() => {
            //   proxy.$axios.request({
            //     url: ""
            //   });
            // }, 1000);
          });
      }
    };
    onMounted(async () => {
      await methods.initQrUrl();
    });
    return {
      state,
      qrcodeUrl
    };
  }
};
</script>
<style scoped>
.loginBtn {
  width: 50px;
  height: 30px;
  line-height: 30px;
  background-color: #ff8200;
  color: white;
  border: none;
  padding: 0;
  border-radius: 10px;
}
.loginModal {
  width: 200px;
  height: 200px;
}
</style>