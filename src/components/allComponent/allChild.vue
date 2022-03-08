<template>
  <div>{{name}}</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent(function hello(props, bind) {
  console.log(bind);
  return {
    name: "setup函数的child"
  };
});
</script>