<template>
  <div>
    <!-- attr默认绑定到根组件，但是可以使用配置，或者使用v-bind将attr绑定到子节点
      多个根节点的子组件，如果不定义配置或使用v-bind绑定attrs，会发出警告
     -->
    <button @click="showAttr()" v-bind="$attrs">获取attr</button>
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
  // inheritAttrs: false,让未定义的属性默认不要挂载到子组件根节点上

  //对于Prop数据不能修改，普通数据会告警，引用型数据不会告警，但是会影响父组件状态，

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
    //函数定义类型，函数是构造函数定义，
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