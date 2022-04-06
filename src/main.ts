import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
//全局API
app.config = {
  // errorHander: (err: any, vm, info) => {
  //   console.log(info);
  // },
  warnHandler: (msg, vm, trace) => {
    console.log(trace);
  },
  globalProperties: {
    name: "全局属性",
  },
  optionMergeStrategies: {
    mergeChild: (old, from) => {
      console.log(from, old);
      return "marge";
    },
  },
  //开发环境在开发工具的性能面板中启用对组件的性能追踪
  performance: true,
  compilerOptions: {
    //识别vue以外的自定义元素，
    isCustomElement: (tag) => tag.startsWith("ion-"),
    //压缩空格
    whitespace: "preserve",
    //文本插值的边界符
    delimiters: ["${", "}"],
    //移除注释
    comments: true,
  },
};
app.directive("myDirective", {
  created(el, bind) {
    console.log(el);
    console.log(bind);
    console.log("全局指令");
  },
});
//全局注册组件
app.component("all-component", {
  template: `<div></div>`,
});
// 注册 (功能指令)
app.directive("my-directive", (el, bind) => {
  // 这将被作为 `mounted` 和 `updated` 调用
  console.log(el);
  console.log(bind);
});
app.provide("user", "provide和inject传递数据");
app.use(router);
app.mount("#app");
