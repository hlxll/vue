<template>
  <div class="textMain" :style="{'min-height':(typeHeight.height+40)+'px'}">
    <wb_type_component 
      :style="{'height':typeHeight.height+'px', 'position': (props.scrollShow)?'fixed':'static'}" 
      class="typeCom wbBgColor">
    </wb_type_component>
    <wb_mian_component style="width: calc(100% - 460px)" class="wbBgColor"></wb_mian_component>
    <wb_host_component style="width: 280px;" class="wbBgColor"></wb_host_component>
  </div>
</template>

<script setup>
import wb_type_component from './wbTypeComponent.vue'
import wb_mian_component from './wbMianComponent.vue'
import wb_host_component from './wbHostComponent.vue'
import { onMounted, reactive, defineProps, watch } from 'vue'

const props = defineProps(['scrollShow'])



const methods = {
  getTypeHeight: function (num) {
    let innerHeight = window.innerHeight;
    return innerHeight-num
  }
}
//左侧三个菜单的数据
let typeHeight = reactive({
  height: 0
})



onMounted(() => {
  typeHeight.height = methods.getTypeHeight(40)+100
})


</script>
<style>
.textMain {
  width: 100%;
  height: max-content;
  background-color: #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
}
.wbBgColor{
  background-color: white;
  height: max-content;
}
.typeCom{
  width: 180px;
  top: 40px;
}
.typeCom2{
  width: 180px;
  position: fixed;
  
}
</style>
