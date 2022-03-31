<template>

  <div>

    <button @click="close">关闭</button>

    <span>{{ name }}</span>

    <div>

      <div style="height: 1000px" @click="updateLocation()">动态加载</div>

      <div id="scrollTopMove">滚动</div>

      <div v-for="item in deepList" :key="item.index">{{ item.name }}</div>

      <button @click="addPush()">添加</button>

    </div>

  </div>

</template>

<script>
export default {
  // emits: ["close"],
  methods: {
    updateLocation() {
      console.log("加载");
    },
    close() {
      this.$emit("close", false);
    },
    addPush() {
      let index = this.deepList.length;
      this.deepList.push({ index: index, name: "huanglin" });
    },
  },
  watch: {
    deepList: {
      handler() {
        console.log("改动数据");
      },
      deep: true,
    },
  },
  data() {
    return {
      deepList: [],
    };
  },
};
</script>
