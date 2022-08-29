<template>
  <div class="headComponent">
    <wb_log class="wbLog"></wb_log>
    <div class="searchWb">
      <img
        class="headSearchIcon"
        @click="f_openInout"
        src="../../../public/image/sousuo.svg"
      />
      <input type="text" class="headSearchInput" v-show="isClicked" />
    </div>
    <button class="loginBtn" @click="methods.f_openLogin">登录</button>
    <loginModal @f-cancel="methods.fCancel" v-show="showLogin">
      <template v-slot:headTitle> 登录 </template>
      <template v-slot:default>
        <div class="loginModal">
          <p>请选择如下方式登录微博</p>
          <p>打开 微博手机APP - 我的 - 扫一扫</p>
        </div>
        <img :src="qrCodeUrl" />
        <div v-if="sessionTimeOut" class="nosessionImg">二维码已过期</div>
      </template>
    </loginModal>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref, defineAsyncComponent } from "vue";
import wb_log from "./wb_log.vue";
const loginModal = defineAsyncComponent(() => {
  return import("./wb_modal.vue");
});
let sessionTimeOut = ref(false);
let qrCodeUrl = ref("");
let showLogin = ref(false);
let getIntervalId = ref();

let { proxy } = getCurrentInstance();

const methods = {
  f_createQr: function () {
    proxy.$axios
      .request({
        url: "/admin/qrCode",
      })
      .then((res) => {
        sessionTimeOut.value = false;
        qrCodeUrl.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    getIntervalId = setInterval(() => {
      proxy.$axios
        .request({
          url: "/admin/getSession",
        })
        .then((res) => {
          if (res.data == "false") {
            sessionTimeOut.value = true;
            clearInterval(getIntervalId);
          }
        })
        .catch((err) => {
          clearInterval(getIntervalId);
        });
    }, 1000);
  },
  fCancel: function (isClose) {
    showLogin.value = !isClose;
  },
  f_openLogin: function () {
    showLogin.value = true;
    methods.f_createQr();
  },
};

//是否打开头部输入框
let isClicked = ref(false);
const f_openInout = function () {
  isClicked.value = !isClicked.value;
};
</script>
<style scoped lang="scss">
.headComponent {
  height: 57px;
  background-color: white;
  display: flex;
  align-items: center;
  .wbLog {
    height: 100%;
    width: 10%;
    padding: 0 30px;
  }
  .searchWb {
    width: auto;
    height: 32px;
    border-radius: 16px;
    background-color: #ddd;
    padding-left: 8px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    .headSearchIcon {
      width: 16px;
      height: 16px;
      padding-right: 8px;
    }
    .headSearchInput {
      outline: none;
      border: none;
      height: 32px;
      width: calc(100% - 32px);
      background-color: transparent;
    }
  }
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
}

.loginModal {
  width: 270px;
  height: auto;
}
.loginModal > p {
  text-align: center;
}
.nosessionImg {
  width: 116px;
  height: 116px;
  line-height: 116px;
  text-align: center;
  background-color: #ddd;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -58px;
}
</style>
