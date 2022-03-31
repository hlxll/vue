<template>
  <div>
    <!-- // 如果子组件只有一个根节点，调用数组使用的属性会挂载到子组件根节点上。 //
    可以使用配置，让这些属性不要挂载到子组件根节点上（inheritAttrs: false,）
    多个根节点不具有自动挂载子组件属性的功能 -->
    <Child class="childName" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Child from "./propChild.vue";
export default defineComponent({
  components: {
    Child,
  },
});
</script>
