<template>
  <div v-once>
    静态内容过多，保证第一次更新，后面不再继续更新，但是得尽量少用
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    updateMethod: function () {
      this.$forceUpdate();
    },
  },
});
</script>
