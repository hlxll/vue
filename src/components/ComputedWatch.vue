<template>
  <div>
    {{ setter }}
    <hr />
    {{ watchData }}
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      setter: "计算属性",
      watchData: ""
    };
  },
  computed: {
    //computed会返回响应式的ref对象。只传入一个方法是只读的，传入get和set对象是可读可写的
    computedData() {
      return "计算属性返回值";
    },
    computedGet: {
      getters() {
        return "自定义的get类compouted";
      }
    },
    computedGet: {
      get() {
        return this.setter;
      },
      set(val) {
        this.setter = val;
      }
    }
  },
  watch: {
    setter: function(oldVal, newVal) {
      this.watchData = newVal;
    }
  }
});
</script>
