<template>
    <div>
        <div class="un_login">
            <div class="un_login_text"></div>
            <button class="login_btn">立即登录</button>
            <div class="login_tip"><span>还没有微博? </span><span>立即注册!</span></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>



.un_login{
    background: url('../../../public/image/bg.jpg');
    height: 184px;
    background-size: 280px 184px;
    text-align: center;
    .un_login_text{
        background: url('../../../public/image/text.png');
        background-size: 100% 64px;
        background-repeat: no-repeat;
        width: 50%;
        height: 63px;
        margin: auto;
        position: relative;
        top: 20px;
    }
    .login_btn{
        width: 50%;
        height: 35px;
        padding: 9px 30px;
        line-height: 16px;
        margin: auto;
        margin-top: 40px;
        border: none;
        border-radius: 17px;
        background-color: rgb(255, 130, 0);
        color: white;
    }
    .login_tip{
        margin-top: 10px;
        font-size: 14px;
        :nth-child(1){
            color: #ddd;
        }
        :nth-child(2) {
            color: rgb(255, 130, 0);
        }
    }
}
</style>