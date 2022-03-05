<template>
  <div>
    {{ name }}
    <br />
    {{ value }}
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  inject: ["name", "value"],
});
</script>
