<template>
  <div>
    <slotChild>
      <!--单个插槽，可以不用template，多个插槽，一定要每个部分都有template，不然会有冲突-->
      <template v-slot:head>具名插槽A </template>

      <!--slotProps是插槽所有传递的attr对象,slot传递过来的，不要用name，防止冲突
        原理：就是props传递数据一样，template是slot的子组件一样
      -->
      <template v-slot:default="slotProps">
        <span>{{ slotProps.item }}</span>
      </template>
      <template #suoxie="slotProps">
        <br />
        <span>{{ slotProps.item }}</span>
      </template>
    </slotChild>

    <!--对slot的props可以进行解构使用，也可以定义默认值,只能使用默认插槽内容-->
    <slotChild v-slot="{ item, value, number = 0 }">
      <br />
      <span>props为item={{ item }}</span>
      <br />
      <span>props为value={{ value }}</span>
      <br />
      <span>props为number={{ number }}</span>
    </slotChild>
  </div>
</template>
<script>
import slotChild from "./slotChild.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    slotChild,
  },
});
</script>
