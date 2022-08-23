<template>
    <div @scroll="f_scrollToTop">
        <video autoplay=true src="https://a.sinaimg.cn/mintra/pic/2112130543/weibo_login.mp4" class="video"></video>

        <div @click="f_pushMsg()">点击事件</div>
    </div>
</template>
<script>
export default {
    data() { 
        return {
            ws: ''
        }
    },
    methods: {
        f_pushMsg: function () {
            this.ws.send('我是'+this.$route.query.user)
        }
    },
    mounted() {
        this.ws = new WebSocket('ws://127.0.0.1:5000')
        this.ws.onopen = (e)=> {
            this.ws.send(this.$route.query.user)
        }
        this.ws.onmessage = (e) => {
            console.log(e);
        }
        
        
    }
}
</script>
<style scoped>
.video{
    width: 100%;
    height: auto;
}
</style>