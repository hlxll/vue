<template>
  <div id="app">
    <Provide />
    <div id="modals" v-my-directive>{{ reposituries }}</div>
    <button @click="changeRep()">改变</button>
    <AsyncComponent v-on:close="changeAsync" v-if="showAsync" />
    <!-- 混入其他组件数据 -->
    <span v-myDirective="'huanglin'">混入：{{ mergeChild }}</span>
    <p>provide和inject{{ user }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  defineAsyncComponent,
  onMounted,
  provide,
  reactive,
  readonly,
  ref,
  watch,
} from "vue";
import Provide from "./components/Provide.vue";
export default {
  name: "App",
  inject: ["user"],
  //子组件设置inheritAttrs，子组件没有设置props时候，判断子组件是否继承父组件props传递的属性
  inheritAttrs: true,
  mixins: [Provide],
  //组件通过ref或者parent或者$root可以访问该组件的数据和方法，但是添加expose限制，定义的才可以被
  //其他组件访问
  expose: ["showAsync"],
  renderTracked({ key, target, type }) {
    console.log({ key, target, type });
  },
  components: {
    Provide,
    AsyncComponent: defineAsyncComponent(() =>
      import("./components/AsyncComponent.vue")
    ),
  },
  setup() {
    //provider为了响应式，可以将数据使用ref或者reactive定义
    const location = ref("north");
    const getLocation = reactive({
      longitude: 90,
      latitude: 135,
    });
    const updateLocation = (data) => {
      console.log(data);
      location.value = "改变provide数据";
    };
    provide("location", location);
    //如果provide传递的数据不想被inject改动，可以加readonly
    provide("getLocation", readonly(getLocation));
    provide("updateLocation", updateLocation);
    //组件创建之前执行
    const reposituries = ref([]);
    const fn_getUser = () => {
      reposituries.value = "黄林";
    };
    onMounted(fn_getUser);
    //该watch和选项是API一样的效果
    watch(reposituries, () => {
      console.log(reposituries.value);
    });
    return {
      reposituries,
      fn_getUser,
    };
  },
  data() {
    return {
      showAsync: true,
    };
  },
  mounted() {},
  methods: {
    changeRep() {
      this.reposituries = "新ref函数创建响应式变量，可以在任何地方使用";
      //迫使组件实例重新渲染，仅仅组件本身和有插入插槽内容的子组件，不是所有子组件
      this.$forceUpdate();
      //和全局nextTick一样，只是this挂载地方不同
      this.$nextTick(() => {
        console.log("下次DOM渲染前执行");
      });
    },
    changeAsync() {
      this.showAsync = !this.showAsync;
    },
  },
};
</script>

<style>
</style>
