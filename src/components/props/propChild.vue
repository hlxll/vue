<template>
  <div>
    <button @click="showAttr()">获取attr</button>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
function typeFun(firstName) {
  firstName instanceof String;
  this.firstName = firstName;
}
var typefun = new typeFun();
export default defineComponent({
  //props传递可以静态或动态的，类型校验，不会报错只会有警告，
  //单向数据原则，不要修改props数据
  props: {
    name: String,
    value: [Number, String],
    propA: {
      type: String,
      default: "1",
      required: true,
    },
    propB: {
      //自定义验证，返回true或false
      validator(value) {
        console.log(value);
        return value.indexOf(1) > -1;
      },
    },
    //函数定义类型
    propC: typefun,
  },
  methods: {
    //没有用props和$emit对应定义的，就是attr了，常见的示例包括 class、style 和 id attribute
    showAttr() {
      console.log(this.$attrs);
    },
  },
});
</script>