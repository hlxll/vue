<template>
  <div>插槽显示</div>
</template>


<script>
import { defineComponent, h, toRefs, ref, reactive } from "vue";
export default defineComponent({
  props: {
    inpData: String
  },
  emits: ["updateInpData"],
  setup(props, context) {
    //props需要在上方定义，不定义只会在attrs中引入
    let { inpData } = toRefs(props);

    /**
     * reactive其实是对js对象的代理，代理和原对象不想等，如果改变原对象，代理不会改变，只有代理是响应式的
     * 多个相同对象代理，是想等的，代理的代理和原代理也是想等的
     */
    let arr = [1, 2, 3, 4];
    let list = reactive(arr);
    /**
     * ref也是代理，但是可支持任何数据类型,如果直接访问该响应式数据，可以直接使用，不用.value，
     * 如果不是顶级数据，是object.proxy访问该代理proxy，就不能直接访问，需要使用.value.
     * 但是如果object也是代理的响应式数据，就可以使用object.proxy了
     */
    let count = ref(0);
    let { slots, attrs, expose } = context;
    //expose向父组件暴露数据，暴露实例，正常使用ref，parent，$root等获取的实例是等同于模板的实例，expose可以创建一个独立的实例
    expose({});
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


