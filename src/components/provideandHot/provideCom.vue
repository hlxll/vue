<template>
  <div>
    <inject-com />
    <button @click="changeProvide()">改变</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
// import injectCom from "./injectCom.vue";
// 动态加载组件，在需要的时候加载他
// const inject = defineAsyncComponent(() => import("./injectCom.vue"));
const inject = defineAsyncComponent({
  loader: () => import("./injectCom.vue"),
  //是否可挂起，如果一个程序错误，什么也没做，我们称为挂起
  suspensible: false,
});

export default defineComponent({
  components: {
    // injectCom,
    injectCom: inject,
  },
  data() {
    return {
      name: "provide和inject使用的传递数据",
    };
  },
  methods: {
    changeProvide() {
      this.name = "改变后的provide";
    },
  },
  //直接使用对象，返回固定数据，provide使用函数，返回对象，才可以使用实例数据
  //   provide: {
  //     name: "name",
  //   },
  //普通传递的数据，更新之后，子组件不会更新，我们可以使用ref或reactive，或者computed返回数据
  provide() {
    return {
      value: this.name,
      name: computed(() => this.name),
    };
  },
});
</script>
