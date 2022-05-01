<template>
  <div>
    <div id="login">login</div>
    <div>{{ foo }}</div>
    <button @click="setHttp()">请求</button>

    <!-- 多视图设置,多个 router-view， 定义name，没有name就是 -->
    <router-view></router-view>
    <router-view name="LoginB"></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$axios);
    this.$axios
      .request({
        url: "127.0.0.1",
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {};
  },
  methods: {
    setHttp() {
      console.log(this.foo);
      // this.$router.push({ path: "/app/1" });
      //按照路由名称跳转，后面带路由参数
      this.$router.push({ name: "appChild", params: { slot: 1 } });

      // 带查询参数，结果是 /register?plan=private
      // router.push({ path: "/register", query: { plan: "private" } });
      // 带 hash，结果是 /about#team
      // router.push({ path: '/about', hash: '#team' })
    },
  },
};
</script>

<style></style>
