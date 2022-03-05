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
      watchData: "",
    };
  },
  computed: {
    computedData() {
      return "计算属性返回值";
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
