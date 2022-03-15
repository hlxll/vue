<template>
  <div>
    <input type="radio" :value="'radio1'" v-model="inputData.radioValue" />
    <!-- lazy是不在input事件修改model，在change之后修改model。
        input是输入时触发，change是输入框失去焦点触发
     -->
    <input
      v-model.lazy="inputData.lazyValue"
      @input="inputValue"
      @change="changeValue"
    />
    <!-- //自动将数据转数字,对于原始数字，parseFloat无法解析，返回原始值 -->
    <input type="text" v-model.number="inputData.numberValue" />

    <!-- 过滤收尾空白字符 -->
    <input v-model.trim="inputData.trimValue" />
    <br /><button @click="viewData()">展示</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      custom: "xulinlin",
      inputData: {
        radioValue: "",
        lazyValue: "",
        numberValue: "",
        trimValue: "",
      },
    };
  },
  methods: {
    viewData() {
      console.log(this.inputData);
    },
    inputValue(value: any) {
      console.log(value);
      console.log(this.inputData.lazyValue);
    },
    changeValue(value: any) {
      console.log(value);
      console.log(this.inputData.lazyValue);
    },
  },
});
</script>