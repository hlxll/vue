<template>
  <div class="wbMain">
    <div class="userHead">{{ username }}的微博主页</div>
  </div>
</template>

<script>
import server from "./server";
export default {
  name: "wbMain",
  data() {
    return {
      username: "huanglin",
    };
  },
  created() {
    server.login();
  },
};
</script>
<style lang="scss">
.wbMain {
  .userHead {
    text-align: center;
  }
}
</style>
