<template>
  <div id="app">
    <button @click="setHttp()">请求</button>

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
// import axios from "axios";
import Provide from "./components/Provide.vue";
export default {
  //有name，对于出错有更详细的提示，使用devtools的时候，未命名组件是显示其他的，有name就会很有语意，找路径方便
  name: "App",
  //未被定义的属性，attrs获取到的属性，将会回退到父组件，且作为普通属性应用到子组件的根节点上（该属性取消默认行为，不应用到子组件）
  inheritAttrs: false,
  inject: ["user"],
  mixins: [Provide],
  //组件通过ref或者parent或者$root可以访问该组件的数据和方法，但是添加expose限制，定义的才可以被
  //其他组件访问
  expose: ["showAsync"],
  renderTracked({ key, target, type }) {
    console.log({ key, target, type });
  },
  beforeCreate() {
    // this.axios
    //   .request({
    //     url: "www.baidu.com",
    //   })
    //   .then((res) => {
    //     console.log("res");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      showAsync: true,
    };
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
    //reactive返回对象的响应式副本,如果将ref对象放进去，reactive会解包所有深层的refs
    const getLocation = reactive({
      longitude: 90,
      latitude: 135,
    });
    // console.log("确定是否是reactive===" + isReactive(getLocation));
    const updateLocation = (data) => {
      console.log(data);
      location.value = "改变provide数据";
    };
    provide("location", location);
    //如果provide传递的数据不想被inject改动，可以加readonly
    //readonly接受一个对象或ref并返回原始对象的只读代理，深层嵌套的都是只读
    provide("getLocation", readonly(getLocation));
    provide("updateLocation", updateLocation);
    //组件创建之前执行
    const reposituries = ref([]);
    const fn_getUser = () => {
      reposituries.value = "黄林";
    };
    onMounted(fn_getUser);
    //该watch和选项API一样的效果
    watch(reposituries, () => {
      console.log(reposituries.value);
    });
    return {
      reposituries,
      fn_getUser,
    };
  },
  methods: {
    setHttp() {
      console.log("请求");

      // axios.get("http://localhost:4000/app/all?username=huanglin").then(res => {
      //   console.log(res);
      // });
    },
    changeRep() {
      this.reposituries = "新ref函数创建响应式变量，可以在任何地方使用";
      //迫使组件实例重新渲染，仅仅组件本身和有插入插槽内容的子组件，不是所有子组件
      this.$forceUpdate();
      //和在seetup中使用的全局nextTick一样，只是this挂载到调用的实例上
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

<script setup>
//这个script响应式状态需要明确使用响应式API，例如ref，reactive创建,不用导出，变量和方法可以直接使用
</script>

<style>
</style>

