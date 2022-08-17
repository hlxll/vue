<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  mounted() {
    console.log(this.$props);
  },
};
</script>
