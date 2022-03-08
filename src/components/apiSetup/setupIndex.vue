<template>
  <div>插槽显示</div>
</template>

<script>
import { defineComponent, h, toRefs, reactive } from "vue";
export default defineComponent({
  props: {
    inpData: String
  },
  emits: ["updateInpData"],
  setup(props, context) {
    //props需要在上方定义，不定义只会在attrs中引入
    let { inpData } = toRefs(props);
    let list = reactive([1, 2, 3, 4]);
    let { slots, attrs } = context;
    return () =>
      h("h" + attrs.hNum, {}, [
        slots.default(),
        h(
          "input",
          {
            modelValue: inpData,
            "onUpdate:modelValue": value => this.$emit("updateInpData", value)
          },
          []
        ),
        list.map(item => h("p", {}, [item]))
      ]);
    // return () => h(resolveComponent('allComponentName'))//引入全局组件名称，使用resolveComponent解析
    // return () => h(allComponentName)//引入局部组件名称，局部组件不用使用api去解析
  }
});
</script>
