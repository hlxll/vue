<template>
    <div class="head">
        <button class="loginBtn" >登录</button>
        <loginModal>
            <div class="loginModal">
                <p>请选择如下方式登录微博</p>
                <p>打开 微博手机APP - 我的 - 扫一扫</p>
            </div>
        </loginModal>
    </div>
</template>
<script>
import loginModal from './wb_modal.vue'
export default {
    name: 'wbHead',
    components: {
        loginModal
    },
    created() { 
        this.f_createQr()
    },
    methods: {
        f_createQr: function () {
            this.$axios
            .request({
                url: "/admin/qrCode",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>
<style scoped>
.loginBtn{
    width: 50px;
    height: 30px;
    line-height: 30px;
    background-color: #ff8200;     
    color: white;   
    border: none;
    padding: 0;
    border-radius: 10px;
}
.loginModal{
    width: 200px;
    height: 200px;
}
</style>