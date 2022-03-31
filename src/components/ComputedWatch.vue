<template>
  <div>
    {{ computedData }}
    <hr />
    {{ name }}
    <button @click="change">change</button>
    <button @click="changeRef">changeRef</button>
  </div>
</template>
<script>
import { defineComponent, watchEffect, watch, reactive, ref } from "vue";
export default defineComponent({
  data() {
    return {
      setter: "计算属性",
      watchData: "监视器数据"
    };
  },
  setup() {
    const obj = reactive({ name: "huanglin", age: 12 });
    let refObj = ref(1);
    watchEffect(() => {
      //初始化也会执行，和watch不同,对于reactive数据，使用key就能监视
      console.log(obj.name);
    });

    //watchEffect是在update更新前执行的
    const stopRef = watchEffect(onInvalidate => {
      //对于ref创建数据，使用.value才能监视
      console.log(refObj.value);

      //这个回调函数，在当前effect执行完执行操作
      onInvalidate(() => {
        console.log("回调函数");
      });
    });
    // stopRef();watchEffect返回的函数，执行后，就不会继续监视数据
    setTimeout(() => {
      obj.name = "xulinlin";
    }, 2000);
    function change() {
      obj.name = "xulinlin2号";
    }
    function changeRef() {
      console.log(refObj);
      refObj.value++;
    }
    watch(
      () => obj.name,
      (old, Val) => {
        console.log(Val);
      }
    );
    //可以监视多个数据
    watch(
      [obj.name, refObj],
      (newVal, preVal) => {
        console.log(preVal);
      },
      {
        deep: true
      }
    );
    //如果想监视对象，需要使用deep配置,不然只能监视基本数据
    return {
      name: name,
      change: change,
      changeRef: changeRef
    };
  },
  methods: {
    changeWatch() {
      this.watchData = "改变后的监视器数据";
    }
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
