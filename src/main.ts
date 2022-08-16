import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
//全局API
app.config = {
  //参数是错误对象，触发该错误的组件实例，错误来源类型信息
  errorHandler: (_err: any, _instance: any, info: any) => {
    console.log(info);
  },
  //为vue警告自定义处理函数，告警信息，来源组件，告警来源信息
  warnHandler: (msg, instance, trace) => {
    console.log(instance);
  },
  globalProperties: {
    name: "全局属性",
  },

  //定义合并策略，对于mixin等
  optionMergeStrategies: {
    mergeChild: (parent: any, child: any) => {
      console.log("child数据" + child);
      return "marge";
    },
  },
  //开发环境在开发工具的性能面板中启用对组件的性能追踪
  performance: true,
  compilerOptions: {
    //识别vue以外的自定义元素，
    isCustomElement: (tag: string) => tag.startsWith("ion-"),
    //压缩空格
    whitespace: "preserve",
    //文本插值的边界符，默认是['{{', '}}']
    delimiters: ["${", "}"],
    //移除注释
    comments: true,
  },
};
app.directive("myDirective", {
  created(el: any, bind: any) {
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
app.directive("my-directive", (el: any, bind: any) => {
  // 这将被作为 `mounted` 和 `updated` 调用
  console.log(el);
  console.log(bind);
});
app.provide("user", "provide和inject传递数据");
app.use(router);
app.mount("#app");
