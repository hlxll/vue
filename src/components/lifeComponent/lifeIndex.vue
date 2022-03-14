<template>
  <div>
    生命周期
    <div>
      <keep-alive ref="keep"></keep-alive>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      name: "huanglin"
    };
  },
  methods: {
    changeName() {
      this.name = "";
    }
  },
  mounted() {
    console.log(this.$refs.keep);
  },
  //初始渲染不会执行，是在虚拟DOM重新渲染执行，返回参数：哪个操作跟踪了组件，该操作目标对象，键
  renderTracked({ key, target, type }) {
    console.log(key);
    console.log(target);
    console.log(type);
  },
  //和renderTracked返回一样，在重新渲染虚拟dom被触发时调用。就是有方法修改界面时触发
  renderTriggered() {
    console.log("triggerer");
  }
});
</script>