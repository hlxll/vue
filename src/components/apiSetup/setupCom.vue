<template>
  <div>
  <div>setup</div>
  <div>
    <div>setup</div>
    <div>
      <p>名称是:{{ name }}</p>
    </div>
    <p>自定义指令input</p>
    <input v-focus:[direction]="200" />
  </div>
  <p>自定义指令input</p>
  <input v-focus:[direction]="200" />
  <div/>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  h,
  onBeforeMount,
  provide,
  inject,
  readonly,
  watch,
  watchEffect
} from "vue";
export default defineComponent({
  data() {
    return {
      direction: "right"
    };
  },
  setup(props, context) {
    //setup实在组件实例之前调用的，所以内部this和其他选项API的this不同

    const propData = toRefs(props);
    let { attrs, slots, emit, expose } = context;

    let name = ref("huanglin");

    var setName = function(value: any) {
      name = value;
    };
    //模板引用
    watch(name, (old, newVal) => {
      console.log(newVal);
    });
    watchEffect(
      () => {
        console.log(name.value);
      },
      {
        //监听器默认在DOM更新前调用，配置flush就在dom更新后执行
        flush: "post"
      }
    );

    // const value = inject('key');
    // const value = inject('key', 'default')//设置inject默认值
    //provide,因为数据单向流动，可以把更新方法也传递下去,如果不想数据被修改，可以使用readonly
    provide("name", "value");
    provide("setName", setName);
    provide("num", readonly(name));
    //声明周期，setup是围绕created和beforeCreate的，在这两个生命周期前，所以不用有这两个生命周期在setup中
    onBeforeMount(() => {
      console.log("生命周期钩子");
    });

    //expose是想 将数据返回给父组件使用ref获取的时候使用，如果setup使用渲染函数，无法返回数据了，就可以使用expose
    expose({
      name
    });
    return { name };
    // return () => h("div", {}, ["setup渲染函数", h("p", {}, ["setup子元素"])]);
  },
  //自定义指令有四个生命周期方法使用，created，beforeMount，mounted，beforeUpdate
  //updated，beforeUnmout，unmounted
  directives: {
    focus: {
      //参数：el操作dom，可以改变style等；bind是传递给指令的数据,bind.value是传递的值，bind.arg是动态参数
      created(el, bind) {
        //想在普通绑定事件之前调用指令，可以使用这个生命周期
        console.log(el);
        console.log(bind);
      },
      beforeMount() {
        //当指令第一次绑定到元素，并且在挂载父组件之前调用
      },
      mounted(el, bind) {
        console.log(el);
        console.log(bind);
        //在绑定元素的父组件被挂载前调用
        el.focus();
      },
      beforeUpdate() {
        //   在更新包含组件的 VNode 之前调用
      },
      updated() {
        //   在包含组件的 VNode 及其子组件的 VNode 更新后调用
      },
      beforeUnmount() {
        // 在卸载绑定元素的父组件之前调用;
      },
      unmounted() {
        //   当指令与元素解除绑定且父组件已卸载时，只调用一次。
      }
    }
  }
});
</script>