<template>
  <div>
    <ChildEmit @emitMethod="emitMethod" />
  </div>
</template>

<script lang="ts">
import ChildEmit from "./childEmit.vue";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  components: {
    ChildEmit,
  },
  methods: {
    emitMethod() {
      alert("emit事件");
    },
  },
});
</script>
