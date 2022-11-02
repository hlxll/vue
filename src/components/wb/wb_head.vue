<template>
  <div class="headComponent" :class="props.allColor ? 'wb_white' : 'wb_black'">
    <wb_log class="wbLog" :logSize="30"></wb_log>
    <div class="searchWb" :style="{ 'background-color': props.allColor ? '#ddd' : '#333' }">
      <div class="headSearchIcon">
        <span @click="f_openInout" class="iconfont icon-sousuo1"></span>
      </div>
      <input type="text" class="headSearchInput" v-show="isClicked" />
      <div class="searchhistory" v-show="isClicked">

      </div>
    </div>
    <div class="headCenterRouteBtn" :style="{ 'margin-left': isClicked ? '-20px' : '146px' }">
      <div class="headRouteBtnItem" :class="item.active ? 'clickItem' : ''" @click="f_changeRoute(item)"
        v-for="item in routeBtns" :key="item.route">
        <div class="headRouteBtnSmall">
          <span class="headRouteBtnIcon iconfont" :class="item.class"
            :style="{ 'color': item.active ? '#f36126' : '' }"></span>
        </div>
      </div>
    </div>
    <button class="loginBtn" @click="methods.f_openLogin">登录</button>

    <loginModal @f-cancel="methods.fCancel" v-if="showLogin">
      <!-- <template v-slot:headTitle> 登录 </template> -->
      <template v-slot:default>
        <div class="loginModal" v-show="loginType == 1">
          <p>请选择如下方式登录微博</p>
          <p style="color: #939393;font-size: 14px;">打开 微博手机APP - 我的 - 扫一扫</p>
          <img :src="qrCodeUrl" style="width: 160px;height: 160px;margin-right: 20px;" />
          <img src="/image/titleLog.png" style="width: 150px;margin-left: 20px;" />
          <div v-if="sessionTimeOut" class="nosessionImg">二维码已过期</div>
        </div>
        <div class="userpass" v-show="loginType == 2">
          <el-input placeholder="邮箱/会员账号/手机号" v-model="loginObj.login_username">
          </el-input>
          <el-input placeholder="请输入密码" v-model="loginObj.login_password">
          </el-input>
        </div>
        <div class="telephone" v-show="loginType == 3">电话登录</div>
        <div v-show="loginType == 1">
          <div style="text-align: center;height: 40px;margin-top: 10px;">其他方式登录:</div>
          <div style="text-align: center;height: 40px;">
            <span style="margin-right: 5px;" @click="methods.f_checkUserPass()">账号登录</span>
            <span style="margin-left: 5px;" @click="methods.f_checkTelephone()">短信登录</span>
          </div>
        </div>
      </template>
    </loginModal>

    <button class="register">注册</button>
    <div class="searchWbZero">
      <span v-show="showWhite" @click="f_changeColor" class=" headSearchIcon iconfont icon-shi-quan-weikaishi"></span>
      <span v-show="!showWhite" @click="f_changeColor" class=" headSearchIcon iconfont icon-shi-quan-weikaishi"></span>
    </div>
    <div class="headRegister" @click="f_addWb()">
      <span class="icon-shuru iconfont"></span>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref, defineAsyncComponent, reactive, defineProps, onMounted } from "vue";
import { useStore } from 'vuex'
import wb_log from "./wb_log.vue";

const store = useStore()
//设置全局颜色背景
const props = defineProps(['allColor'])
let { proxy } = getCurrentInstance();
const loginModal = defineAsyncComponent(() => {
  return import("./wb_modal.vue");
});
let sessionTimeOut = ref(false);
let qrCodeUrl = ref("");
let showLogin = ref(false);
let getIntervalId = ref();
let loginType = ref(1);
let loginObj = reactive({
  login_username: '',
  login_password: ''
})
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
        qrCodeUrl.value = '/image/loginErCode.png'
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
    loginType.value = 1
  },
  //切换账号密码登录
  f_checkUserPass: function () {
    loginType.value = 2
  },
  f_checkTelephone: function () {
    loginType.value = 3
  }
};
//是否打开头部输入框
let isClicked = ref(false);
const f_openInout = function () {
  isClicked.value = !isClicked.value;
};


//顶部中间路由跳转
let routeBtns = reactive([{ route: '1', class: 'icon-shouye' }, { route: '2', class: 'icon-shipin1' },
{ route: '3', class: 'icon-rocket' }, { route: '4', class: 'icon-xiaoxitongzhi' }, { route: '5', class: 'icon-gerenxinxi' }])


//改变全局颜色
let showWhite = ref(true)
const f_changeColor = function () {
  showWhite.value = !showWhite.value
  store.commit('setColor', { whiteAndBlock: showWhite.value })
}

//切换顶部菜单
const f_changeRoute = function (node) {
  routeBtns.forEach(item => {
    if (item.route == node.route) {
      item.active = true
    } else {
      item.active = false
    }
  })
}
//添加微博
const f_addWb = function () {
  if (store.state.isLogin) {
    console.log("跳转添加")
  } else {
    this.showLogin = true
  }
}
</script>
<style scoped lang="scss">
.headComponent {
  height: 57px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;

  .wbLog {
    height: 100%;
    padding-left: 30px;
  }

  .searchWb {
    width: auto;
    height: 30px;
    text-align: center;
    background-color: #ddd;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .headSearchIcon {
      width: 30px;
      height: 30px;
      line-height: 30px;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .headSearchInput {
      background-color: transparent;
      outline: none;
      border: none;
      height: 32px;
      width: calc(100% - 32px);
    }

    .searchhistory {
      position: absolute;
      top: 30px;
      left: 0;
      width: 150px;
      height: 200px;
    }

  }

  .searchWbZero {
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #ddd;
    border-radius: 15px;
    margin-left: 10px;
  }

  .headRegister {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f36126;
    border-radius: 15px;
    margin-left: 20px;
    cursor: pointer;

    span {
      font-size: 14px;
      margin-left: 3px;
      color: white;
    }
  }

  .headCenterRouteBtn {
    display: flex;
    width: 50%;

    .headRouteBtnItem {
      width: calc(20% - 40px);
      height: 56px;
      line-height: 56px;
      text-align: center;
      margin: 0 20px;
      border-bottom: 2px solid transparent;
      display: flex;
      align-items: center;

      .headRouteBtnSmall {
        width: 70px;
        height: 38px;
        line-height: 38px;
        margin: auto;

        &:hover {
          background-color: #ddd;
        }

        .headRouteBtnIcon {
          font-size: 30px;
        }
      }
    }

    .clickItem {
      border-bottom: 2px solid #f36126;
    }
  }

  .loginBtn {
    cursor: pointer;
    width: 50px;
    height: 30px;
    line-height: 30px;
    background-color: #ff8200;
    color: white;
    border: none;
    padding: 0;
    border-radius: 10px;
  }

  .register {
    cursor: pointer;
    border: none;
    background: transparent;
    color: #333;
    margin-left: 5px;
  }
}

.loginModal {
  width: auto;
  height: auto;
}

.loginModal>p {
  text-align: center;
}

.userpass {
  width: auto;
  height: auto;
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
