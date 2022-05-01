import { createApp } from "vue";
import mainVue from './views/mainVue.vue'
import router from "./router";

import useApi from './plugin/appApi'
import axioApi from './axio/index.js'

//ts项目对于文件会判断数据类型，引入的是js文件，所以会告警，类型是any，tsconfig配置"allowJs": true,//允许js
// "noImplicitAny": false,

// axios.interceptors.request.use(() => {
//   console.log('req');
// })
// axios.request({
//   url: '127.0.0.1'
// }).catch((err: any) => {
//   console.log(err);
// })
const app = createApp(mainVue);

app.provide("user", "provide和inject传递数据");
app.use(router);
app.use(useApi)
app.use(axioApi)
app.mount("#app");
