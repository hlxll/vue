<template>
  <div>
    <inject-com />
    <button @click="changeProvide()">改变</button>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import injectCom from "./injectCom.vue";
export default defineComponent({
  components: {
    injectCom,
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
