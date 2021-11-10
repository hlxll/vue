<template>
  <div id="app">
    <Provide />
    <div id="modals" v-my-directive>{{ reposituries }}</div>
    <button @click="changeRep()">改变</button>
    <AsyncComponent v-on:close="changeAsync" v-if="showAsync" />
    <!-- 混入其他组件数据 -->
    <span v-myDirective="'huanglin'">混入：{{ mergeChild }}</span>
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
  mixins: [Provide],
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
      console.log(this.$options);
      this.reposituries = "新ref函数创建响应式变量，可以在任何地方使用";
    },
    changeAsync() {
      this.showAsync = !this.showAsync;
    },
  },
};
</script>

<style>
</style>
