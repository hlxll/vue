import { createApp } from "vue";
import { createStore } from "vuex";
import vuex_state from './vuex/state'
import vuex_commit from './vuex/mutation'
import mainVue from "./views/mainVue.vue";
import router from "./router";

import translate from "./plugin/translate";
import useApi from "./plugin/appApi";
import axioApi from "./axio/index.js";
import '../public/style/iconfont.css'




//ts项目对于文件会判断数据类型，引入的是js文件，所以会告警，类型是any，tsconfig配置"allowJs": true,//允许js
// "noImplicitAny": false,
const rootProp = {
  name: "根props",
};
const app = createApp(mainVue, rootProp);
const store = createStore({
  state: vuex_state,
  mutations: vuex_commit
})
app.use(store)
app.provide("user", "provide和inject传递数据");
app.use(router);
app.use(useApi);
app.use(axioApi);
// use第二个参数，可以在插件对象中第二个参数获取
app.use(translate, "第二个参数");
//第二个参数是设置是否服务端渲染
app.mount("#app", false);
// eventBus.bus.on('name', '1', function (data) {
//   console.log(data)
// })
// eventBus.bus.emit('name', 'huagnlin')