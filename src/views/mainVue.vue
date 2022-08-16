<template>
  <div>
    <render-component></render-component>
    <router-view></router-view>
    <el-date-picker></el-date-picker>
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
