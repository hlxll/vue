<template>
  <div class="wbCom">
    <wbMain></wbMain>
    <Transition name="head">
      <wbHead v-show="scrollShow" class="wbHead"></wbHead>
    </Transition>
    <wbTextItem></wbTextItem>
  </div>
</template>
<script>
import wbMain from "../components/wb/wb_main.vue";
import wbHead from "../components/wb/wb_head.vue";
import wbTextItem from "../components/wb/wbTextItem.vue";
export default {
  components: {
    wbMain,
    wbHead,
    wbTextItem,
  },
  data() {
    return {
      scrollShow: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.f_scroll);
  },
  methods: {
    f_scroll: function () {
      if (window.scrollY >= 10) {
        if (!this.scrollShow) {
          this.scrollShow = true;
        }
      } else {
        this.scrollShow = false;
      }
    },
  },
};
</script>
<style lang="scss">
.wbCom {
  .wbHead {
    position: fixed;
    left: 0;
    right: 0%;
    top: 0;
  }
}

.head-enter-active,
.head-leave-active {
  transition: opacity 1s;
}

.head-enter-from,
.head-leave-to {
  opacity: 0;
}
</style>
