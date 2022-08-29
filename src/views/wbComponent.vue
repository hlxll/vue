<template>
  <div class="wbCom">
    <wbMain></wbMain>

    <Transition name="showHead">
      <wbHead v-show="scrollShow" class="wbHead"></wbHead>
    </Transition>
    <wbTextItem :scrollShow="scrollShow" ></wbTextItem>
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
      if (window.scrollY >= 290) {
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
<style>
.wbHead {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }

.showHead-enter-active{
  transition: transform 1s ease;
}
.showHead-leave-active {
  transition: transform 1s ease;
}

.showHead-enter-from{
  transform: translateY(-100px);
}
.showHead-enter-to{
  transform: translateY(0px);
}
.showHead-leave-from{
  transform: translateY(0px);
}
.showHead-leave-to {
  transform: translateY(-100px);
}
</style>
