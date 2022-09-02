<template>
  <div class="wbLog">
    <span class="iconfont icon-xinlangweibo" :style="{ 'font-size': (props.logSize || 30)+'px'}"></span>
    <div class="logJustyi">
      <span class="bgWeiBo"></span>
      <span class="bgweibocom"></span>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps(['logSize'])
</script>
<style scoped lang="scss">

.wbLog {
  display: flex;
  align-items: center;
  width: 90px;
  .logJustyi {
    width: 46px;
    height: 70%;
    display: inline-block;
  }
  .bgWeiBo {
    background: url("../../../public/image/logo.png");
    background-size: cover;
    width: auto;
    height: 50%;
    display: block;
    background-position: -67px -1px;
  }
  .bgweibocom {
    background: url("../../../public/image/logo.png");
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 38%;
    display: block;
    margin: auto;
  }
}
</style>
