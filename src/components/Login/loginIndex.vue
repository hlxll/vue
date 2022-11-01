<template>
  <div>
    <div id="login">login</div>
    <div>{{ foo }}</div>
    <div>{{ name }}</div>
    <button @click="setHttp()">请求</button>
    <span v-html="htmlStr"></span>
    <!-- 多视图设置,多个 router-view， 定义name，没有name就是 -->
    <router-view></router-view>
    <router-view name="LoginB"></router-view>
  </div>
</template>

<script>

export default {
  mounted() {
    // this.$axios
    //   .request({
    //     url: "/admin",
    //   }).then(res => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    let str = String(-321)
    let list = str.split('')
    let type = ''
    if (list[0] == '-') {
      type = '-'
      list.splice(0, 1)
    }
    list.reverse()
    let newNum = list.join('')
    console.log(newNum)
    if (type == '' && newNum < 2 ^ 31) {
      return newNum
    }
    if (type == '') {
      return 0
    }
    if (type == '-' && newNum <= 2 ^ 31) {
      return newNum
    }
    if (type == '-') {
      return 0
    }
  },
  data() {
    return {
      htmlStr: '<span>huanglin</span>'
    };
  },
  methods: {
    setHttp() {
      this.$router.push({ path: '/login/moreView' })
      // this.$router.push({ path: "/app/1" });
      //按照路由名称跳转，后面带路由参数
      // this.$router.push({ name: "appChild", params: { slot: 1 } });

      // 带查询参数，结果是 /register?plan=private
      // router.push({ path: "/register", query: { plan: "private" } });
      // 带 hash，结果是 /about#team
      // router.push({ path: '/about', hash: '#team' })
    },
  },
};
</script>