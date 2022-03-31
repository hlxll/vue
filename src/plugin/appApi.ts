export default (app: any, param: any) => {
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
  //无效？？
  app.config.optionMergeStrategies.custom = (parent: any, child: any) => {
    return child;
  };

  //directive两个参数，第二个参数是指令实例
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

  app.mixin({
    data() {
      return {
        name: "全局mixin",
      };
    },
  });
  app.provide("appName", "全局provide传递数据");
};
