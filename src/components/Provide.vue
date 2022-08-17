<template>
  <div>
    <div>{{ msg }}</div>

    <div>provider和inject使用{{ userLocation }}</div>

    <button @click="updateLocation('inject参数')">改变provide</button>

    <button @click="changeShow()">触发transition</button>

    <TrabsitionCpm :show="show" />

    <!-- <teleport to="#modals">
    <div>模态框 ? ? ?</div>
  </teleport> -->
  </div>
</template>

<script>
import { inject, onMounted, ref, toRefs, watch } from "vue";
import TrabsitionCpm from "./TrabsitionCom.vue";
export default {
  name: "HelloWorld",
  components: {
    TrabsitionCpm,
  },
  props: {
    msg: String,
  },
  expose: ["increment"],
  //  !!!setup如果返回渲染函数，就不能再将属性暴露给外部访问，可以使用expose
  setup(props, context) {
    console.log(context);
    const userLocation = inject("location", "ownValue");
    const updateLocation = inject("updateLocation");
    //props是响应式的，不能使用ES6解构，会消除prop响应，得使用toRefs解构
    const { msg } = toRefs(props);
    //有些props不是必须得，解构需要用toRef
    // const { msg } = toRef(props, "msg");
    console.log(msg.value);
    //组件创建之前执行
    const reposituries = ref([]);
    const fn_getUser = () => {
      reposituries.value = "黄林";
    };
    onMounted(fn_getUser);
    //该watch和选项式API一样的效果
    watch(reposituries, () => {
      console.log(reposituries.value);
    });

    context.expose({
      fn_getUser,
    });
    //setup第二个参数暴露组件得三个property,Attribute，插槽，出发方法emit，他不是响应式得，可以es6解构

    return {
      reposituries,
      fn_getUser,
      userLocation,
      updateLocation,
    };
  },
  data() {
    return {
      show: true,
      mergeChild: "mergeChild",
      value: '子组件mixin数据'
    };
  },
  methods: {
    changeShow() {
      const updateLocation = inject("updateLocation");
      console.log(updateLocation);
      this.show = !this.show;
    },
  },
};
</script>
