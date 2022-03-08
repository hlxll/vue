<template>
  <div>
    slot使用
    <!--slot中的数据是当父组件没有传递slot时候的默认值-->
    <slot :item="name" :value="value" :number="2">slot默认数据</slot>
    <!--具名插槽，不带名字默认是name=“default”-->
    <slot name="head" :number="1"></slot>
    <slot name="suoxie" item="缩写slot"></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      name: "nameprops",
      value: "valueProp"
    };
  }
});
</script>
