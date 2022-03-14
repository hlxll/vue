<template>
  <div></div>
</template>
<script>
import { defineComponent, customRef } from "vue";
// customRef传递函数，接收两个参数，函数必须有get和set方法，自定义ref方法的依赖和更新控制
function ownCustomRef(value) {
  return customRef((tracker, trigger) => {
    return {
      get() {},
      set() {}
    };
  });
}
export default {
  setup() {
      let 
    return {
      text: ownCustomRef("name")
    };
  }
};
</script>