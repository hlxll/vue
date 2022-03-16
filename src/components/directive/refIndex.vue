<template>
  <div>
    <span ownDire:[dynamicParam]="200"></span>
  </div>
</template>
<script>
import { defineComponent, customRef, directive } from "vue";
// customRef传递函数，接收两个参数，函数必须有get和set方法，自定义ref方法的依赖和更新控制
function ownCustomRef(value) {
  return customRef((tracker, trigger) => {
    return {
      get() {},
      set() {},
    };
  });
}
export default {
  directives: {
    ownDire: {
      mounted(el, bind) {
        // binding.arg 是我们传递给指令的参数
        //binding.value是传递的数据
        //当在组件中使用时，自定义指令总是会被应用在组件的根节点上。
        // 和 attribute 不同，指令不会通过 v-bind="$attrs" 被传入另一个元素。
        // 有了片段支持以后，组件可能会有多个根节点。当被应用在一个多根节点的组件上时，指令会被忽略，并且会抛出一个警告。
        const s = binding.arg || "top";
      },
    },
  },
  setup() {
    return {
      text: ownCustomRef("name"),
    };
  },
};
</script>