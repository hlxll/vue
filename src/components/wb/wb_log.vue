<template>
  <div class="wbLog">
    <span class="wbIcon logSize"></span>
    <div class="logJustyi">
      <span class="bgWeiBo"></span>
      <span class="bgweibocom"></span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wbLog {
  width: 100%;
  height: 100%;
  .wbIcon {
    background: url("../../../public/image/wbIcon.jpg");
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .logSize {
    width: 40%;
    height: 100%;
  }
  .logJustyi {
    width: 50%;
    height: 100%;
    display: inline-block;
  }
  .bgWeiBo {
    background: url("../../../public/image/logo.png");
    background-size: cover;
    width: auto;
    height: 50%;
    display: block;
    background-position: -95px -1px;
  }
  .bgweibocom {
    background: url("../../../public/image/logo.png");
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 38%;
    display: block;
    background-position: 3px 0px;
    margin: auto;
  }
}
</style>
