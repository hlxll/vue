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
.wbLog{
    width: 100%;
    height: 100%;
    .wbIcon{
        background: url('../../../public/image/wbIcon.jpg');
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .logSize{
        width: 40%;
        height: 100%;
    }
    .logJustyi{
        width: 60%;
        height: 100%;
        display: inline-block;
    }
    .bgWeiBo{
        background: url('../../../public/image/logo.png');
        background-size: auto;
        width: 100%;
        height: 50%;
        display: block;
        background-position: -146px -4px;
    }
    .bgweibocom{
        background: url('../../../public/image/logo.png');
        background-size: 190px;
        background-repeat: no-repeat;
        width: 100%;
        height: 50%;
        display: block;
        background-position: 0px 0px;
        margin: auto;
    }
}
</style>