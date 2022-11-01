<template>
  <div class="textMain" :style="{ 'min-height': (typeHeight.height + 40) + 'px', 'background-color': allColor ? '#ddd' : 'black' }">
    <wb_type_component :class="allColor ? 'wb_white' : 'wb_black'" @change-route="methods.changeRoute"
      :style="{ 'height': typeHeight.height + 'px', 'position': (props.scrollShow) ? 'fixed' : 'static' }"
      class="typeCom wbBgColor">
    </wb_type_component>
    <wb_mian_component :class="allColor ? 'wb_white' : 'wb_black'"
      :style="{ 'margin-left': (props.scrollShow) ? '190px' : '10px' }" style="width: calc(100% - 460px)" class="wbBgColor">
    </wb_mian_component>
    <wb_host_component :color="allColor" style="width: 270px;margin-left: 10px;" class="wbBgColor">
    </wb_host_component>
  </div>
</template>

<script setup>
import wb_type_component from './wbTypeComponent.vue'
import wb_mian_component from './wbMianComponent.vue'
import wb_host_component from './wbHostComponent.vue'
import { onMounted, reactive, defineProps, watch, computed } from 'vue'
import { useStore } from 'vuex';
const props = defineProps(['scrollShow'])



const allColor = computed(() => {
  const store = useStore()
  return store.state.whiteAndBlock
})

const methods = {
  getTypeHeight: function (num) {
    let innerHeight = window.innerHeight;
    return innerHeight - num
  },
  changeRoute: function (to) {
    console.log(to)
  }
}
//左侧三个菜单的数据
let typeHeight = reactive({
  height: 0
})



onMounted(() => {
  typeHeight.height = methods.getTypeHeight(40) + 100
})


</script>
<style>
.textMain {
  width: 100%;
  height: max-content;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
}

.wbBgColor {
  height: max-content;
  margin-top: 10px;
}

.typeCom {
  width: 180px;
  top: 46px;
}

.typeCom2 {
  width: 180px;
  position: fixed;
}
</style>
