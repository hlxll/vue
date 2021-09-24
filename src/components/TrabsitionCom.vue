<template>
  <transition name="fade">
    <div v-if="show">transition效果</div>
  </transition>
</template>
<script>
export default {
  props: {
    show: Boolean,
  },
  setup() {},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>