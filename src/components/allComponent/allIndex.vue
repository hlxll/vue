<template>
  <div>
    {{name}}
    <asyncComponent />
    <asyncComponentTwo />
    <custom-compon />
  </div>
</template>
<script>
import {
  h,
  defineComponent,
  defineAsyncComponent,
  defineCustomElement,
  resolveComponent,
  resolveDynamicComponent,
  resolveDirective,
  withDirectives,
  mergeProps,
  useCssModule
} from "vue";
//defineAsyncComponent需要时才会加载的异步组件
const asyncComponent = defineAsyncComponent(() => import("./allChild.vue"));
const LoadingComponent = defineAsyncComponent(() => import("./loadingCom.vue"));
const ErrorComponent = defineAsyncComponent(() => import("./allError.vue"));
const asyncComponentTwo = defineAsyncComponent({
  loader: () => import("./allChild.vue"),
  // 加载异步组件时的临时展示要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 1000,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 1000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry();
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail();
    }
  }
});
//创建自定义组件使用，接受和defineComponent一样的参数，
const customCompon = defineCustomElement({
  props: {},
  emits: {},
  template: `<span>defineCustom组件定义</span>`
});
// 注册该自定义元素。
// 注册过后，页面上所有的 `<custom-compon>` 标记会被升级。
customElements.define("custom-compon", customCompon);
//defineComponent可以是加入实例对象，也可以是setup方法
export default defineComponent({
  data() {
    return {};
  },
  directives: {
    highText: {
      mounted(el) {
        console.log(el);
      }
    }
  },
  components: {
    asyncComponent,
    asyncComponentTwo
  },
  //setup返回值应该返回h渲染函数，不应该返回VNode，会有告警
  setup(prop, context) {
    const { attrs } = context;
    //resolveComponent只能在render或setup中使用,解析已加载的组件
    const ResolveCom = resolveComponent("asyncComponent");
    console.log(ResolveCom);
    //和component is一样的机制解析组件,只能在render和setup使用
    const dynamicCom = resolveDynamicComponent("asyncComponent");
    console.log(dynamicCom);
    //解析指令，只能在render和setup中使用
    const directivePro = resolveDirective("highText");
    console.log(directivePro);
    //合并props和对象，返回一个新对象，原对象不会更改。可以合并很多个对象
    const props = mergeProps(
      {
        // 该 class 将与 $attrs 中的其他 class 合并。
        class: "active"
      },
      attrs
    );

    //返回的虚拟dom想使用css，可以使用useCssModule加载style,返回css的class名等
    const style = useCssModule();
    console.log(style);

    return () => h("div", { props, class: style.success }, "Task complete!");
    //虚拟dom和指令数组两个参数，返回VNode
    // return withDirectives(h("div", { props, class: style.succsss }), [
    //   [directivePro]
    // ]);
  }
});
defineComponent(function hello(props, bind) {
  console.log(bind);
  return {
    name: "setup函数的define"
  };
});
</script>
<style module>
.success {
  color: #090;
}
</style>