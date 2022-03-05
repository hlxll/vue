<template>
  <div>
    <button @click="$emit('emitMethod', { name: '1', value: 2 })">
      emit点击
    </button>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    nameValue: String,
  },
  //   emits: ["emitMethod"],
  // 数组定义emit的事件，如果使用对象，可以为emits事件定义校验
  emits: {
    //返回布尔值，表示该emit事件是否有效
    emitMethod: ({ emit, password }: never) => {
      if (emit && password) {
        return true;
      }
      return false;
    },
  },
});
</script>
