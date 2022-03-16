<template>
  <div>
    {{ setter }}
    <hr />
    {{ watchData }}
    {{ methodData() }}
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      setter: "计算属性",
      watchData: "",
    };
  },
  methods: {
    //该方法和计算属性一样，但是计算属性有缓存功能，当传入内部的响应式数据不变，该方法还是会执行，但是计算属性不会。
    //会使用缓存
    methodData() {
      return "方法返回值";
    },
  },
  computed: {
    //computed会返回响应式的ref对象。只传入一个方法是只读的，传入get和set对象是可读可写的
    //是内部响应式属性改变，计算属性才会重新执行，new date()会改变数据，但是不是响应式的，不会导致计算属性重新执行
    computedData() {
      return "计算属性返回值";
    },
    computedGet: {
      getters() {
        return "自定义的get类compouted";
      },
    },
    computedGet: {
      get() {
        return this.setter;
      },
      set(val) {
        this.setter = val;
      },
    },
  },
  watch: {
    setter: function (oldVal, newVal) {
      this.watchData = newVal;
    },
  },
});
</script>
