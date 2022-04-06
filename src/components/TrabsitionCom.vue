<template>
  <div>
    <transition name="fade">
      <div v-show="show">transition效果</div>
    </transition>
    <p>子组件路由{{$route.params.id}}</p>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log(this.$route.params);
  }
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
