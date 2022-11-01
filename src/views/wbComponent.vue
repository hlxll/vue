<template>
  <div class="wbCom" :class="allColor?'wb_white':'wb_black'">
    <wbMain></wbMain>
    <Suspense :timeout="susTimeFun" @pending="susPend()" @resolve="susResol()" @fallback="susFall()">
      <wbTextItem :scrollShow="scrollShow"></wbTextItem>
      <template #fallback>
        加载中
      </template>
    </Suspense>
    <Transition name="showHead">
      <wbHead v-show="scrollShow"  class="wbHead" :allColor="allColor"></wbHead>
    </Transition>
  </div>
</template>
<script>
import wbMain from "../components/wb/wb_main.vue";
import wbHead from "../components/wb/wb_head.vue";
import {defineAsyncComponent} from "vue"
import { useStore } from 'vuex'
export default {
  components: {
    wbMain,
    wbHead,
    wbTextItem: defineAsyncComponent({
      loader: () => {
        console.log(defineAsyncComponent)
        return import('../components/wb/wbTextItem.vue')
      },
      delay: 100,
      timeout: 10000
    })
  },
  data() {
    return {
      scrollShow: false,
      susTimeFun: 6000
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
    susPend: function () { 
      console.log(1)
    },
    susResol: function () { 
      console.log(2)
    },
    susFall: function () { 
      console.log(3)
    },
  },
  computed: {
    allColor: function () {
      const store = useStore()
      return store.state.whiteAndBlock
    }
  }
};
</script>
<style>
.wb_white{
  background-color: white;
  color: black;
}
.wb_black{
  background-color: black;
  color: white;
}
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
