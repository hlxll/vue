<template>
  <div>
    <router-view></router-view>
    <transition name="fade">
      <div v-show="show">transition效果</div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
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
