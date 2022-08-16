import { h, resolveDynamicComponent } from "vue";

export default (app: any, param: any) => {


  // console.log(app.version)
  //  字符串形式，app.version获取vue版本，对于不同版本写不同插件很有用

  //============================应用配置
  // app.comfig.errorHandler = (err, vm) => {
  //   console.log('在渲染函数和侦听器执行期间出现的错误处理')
  // }
  app.config.warnHandler = (msg, vm, trace) => {
    console.log('vue运行时的警告，只在开发环境有效');
  }
  app.config.globalProperties.foo = '全局属性'

  //为使用mixin时候，组件数据合并的策略
  app.config.optionMergeStrategies.foo = (parent, child) => {
    return '子child的value'
  }
  //只适用于开发环境，在浏览器的timeline面板启用对性能追踪
  app.config.performance = true
  //传入浏览器内的模板编译器，影响每一个组件，
  app.config.compilerOptions = {
    //识别vue以外的自定义元素，
    isCustomElement: (tag) => tag.startsWith("ion-"),
    //压缩空格
    whitespace: "preserve",
    //文本插值的边界符
    delimiters: ["${", "}"],
    //移除注释
    comments: true,
  }


  //==================================应用API

  //可以检索或注册组件，如果没有第二个参数，就是检索组件，第二个参数可以是函数或对象
  app.component("button-counter", {
    data() {
      return {
        count: 0,
      };
    },
    template: `
            <button @click="count++">
              You clicked me {{ count }} times.
            </button>`,
  });
  app.component('render-component', {
    render() {
      //resolveDynamicComponent,只能在render或setup中使用，和:is一样的解析组件功能，返回已经解析的组件或新创建VNode
      const resolveComponent = resolveDynamicComponent('myComponent')
      return h('h1', {}, 'render渲染')
    }
  })


  //directive两个参数，第二个参数是指令实例，传入两个参数是注册指令，只传入第一个是检索已注册指令
  app.directive("my-directive", {
    // 指令具有一组生命周期钩子：
    // 参数：el是指令绑定到的元素。这可用于直接操作 DOM
    //bind是prototype对象，比如传递的参数等。应该只改动el，其他参数不要修改他
    // 在绑定元素的 attribute 或事件监听器被应用之前调用
    created(el: any, bind: any) {
      console.log(el);
      el.append("<span></span>");
      console.log(bind.value);
    },
    // 在绑定元素的父组件挂载之前调用
    // beforeMount() { },
    // 在绑定元素的父组件挂载之后调用
    // mounted() { },
    // 在包含组件的 VNode 更新之前调用
    // beforeUpdate() { },
    // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
    // updated() { },
    // 在绑定元素的父组件卸载之前调用
    // beforeUnmount() { },
    // 在绑定元素的父组件卸载之后调用
    // unmounted() { }
  });
  app.directive('myDirective', () => {
    //传入函数，是mounted和updated调用
  })
  //全局混入，可以在任何组件中得到他，不建议使用
  app.mixin({
    data() {
      return {
        name: "全局mixin使用",
      };
    },
  });
  app.provide("appName", "全局provide传递数据");
};
