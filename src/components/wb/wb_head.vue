<template>
    <div class="head">
        <button class="loginBtn" >登录</button>
        <loginModal>
            <div class="loginModal">
                <p>请选择如下方式登录微博</p>
                <p>打开 微博手机APP - 我的 - 扫一扫</p>
            </div>
            <img :src="qrCodeUrl"/>
            <div v-if="sessionTimeOut" class="nosessionImg">二维码已过期</div>
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
    data() { 
        return {
            qrCodeUrl: '',
            getSession: '',
            sessionTimeOut: false
        }
    },
    methods: {
        f_createQr: function () {
            this.$axios
            .request({
                url: "/admin/qrCode",
            }).then((res) => {
                this.sessionTimeOut = false
                this.qrCodeUrl = res.data
            })
            .catch((err) => {
                console.log(err);
            });
            this.getSession = setInterval(() => {
                this.$axios.request({
                    url: "/admin/getSession"
                }).then(res => {
                    if (res.data == 'false') {
                        this.sessionTimeOut = true
                        clearInterval(this.getSession)
                    }
                })
            }, 1000)
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
    width: 270px;
    height: auto;
}
.loginModal > p{
    text-align: center;
}
.nosessionImg{
    width: 116px;
    height: 116px;
    line-height: 116px;
    text-align: center;
    background-color: #ddd;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -58px;
}
</style>