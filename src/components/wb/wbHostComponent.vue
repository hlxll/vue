<template>
    <div>
        <div class="un_login">
            <div class="un_login_text"></div>
            <button class="login_btn">立即登录</button>
            <div class="login_tip"><span>还没有微博? </span><span>立即注册!</span></div>
        </div>
        <div class="r_top10" :class="allColor ? 'wb_white' : 'wb_black'">
            <div class="r_top10_head">
                <span>微博热搜</span>
                <div class="r_top10_head_referse">
                    <i class="iconfont icon-xian-quan-shuaxin"></i>
                    点击刷新
                </div>
            </div>
            <div class="r_top10_hot">
                <i class="iconfont icon-tool-top" style="color: #f26d5f;margin-right: 5px;"></i>
                <span style="font-size: 14px;">{{ hotNew.name }}</span>
                <div class="r_top10_hot_newType">热</div>
            </div>
            <div class="r_top10_hot" v-for="item in top10" :key="item.id">
                <i style="color: #f26d5f;margin-right: 5px;float: left;" v-if="item.num">{{ item.num }}</i>
                <i class="iconfont icon-circle2" style="color: #f26d5f;float: left;margin-right: 5px;font-size: 4px;"
                    v-if="!item.num"></i>
                <span class="r_top10_item_name" :title="item.name">{{ item.name }}</span>
                <span class="r_top10_item_sum" :title="changeNumType(item.sum)">{{ changeNumType(item.sum) }}</span>
                <div class="r_top10_hot_newType">{{ item.hotType }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex';
export default {
    data() {
        return {
            hotNew: {
                name: '飞天圆梦'
            },
            top10: [
                {
                    num: 1,
                    name: '江南不要再写了ssssssasdasd',
                    sum: 119900000,
                    hotType: '热'
                },
                {
                    name: '江南不要再写了ssssssasdasd',
                    sum: 119900000,
                    hotType: '商'
                },
            ]
        }
    },
    methods: {
        changeNumType(num) {
            let list = String(num).split('')
            if (list.length <= 4) {
                return num
            }
            let start = +list.slice(0, 5).join('')
            let type = ['万']
            start = start / 10000
            for (let i = 5; i < list.length; i++) {
                start *= 10
                if (start >= 10000) {
                    type.unshift('万')
                    start = start / 10000
                }
            }
            for (let i = type.length - 2; i >= 0; i--) {
                if (type[i + 1] == '万' && type[i] == '万') {
                    type.splice(i + 1, 1)
                    type[i] = '亿'
                }
            }
            return start + type.reduce((a, b) => {
                return a + b
            })
        }
    },
    computed: {
        allColor: function () {
            const store = useStore()
            return store.state.whiteAndBlock
        }
    }
}
</script>
<style lang="scss" scoped>
.un_login {
    background: url('../../../public/image/bg.jpg');
    height: 184px;
    background-size: 280px 184px;
    text-align: center;

    .un_login_text {
        background: url('../../../public/image/text.png');
        background-size: 100% 64px;
        background-repeat: no-repeat;
        width: 50%;
        height: 63px;
        margin: auto;
        position: relative;
        top: 20px;
    }

    .login_btn {
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

    .login_tip {
        margin-top: 10px;
        font-size: 14px;

        :nth-child(1) {
            color: #ddd;
        }

        :nth-child(2) {
            color: rgb(255, 130, 0);
        }
    }
}

.r_top10 {
    padding: 10px;
    margin-top: 10px;

    .r_top10_head {
        width: 100%;
        color: #333;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;

        .r_top10_head_referse {
            float: right;
            color: #939393;
            width: auto;
            cursor: pointer;
        }
    }

    .r_top10_hot {
        width: 100%;
        height: 30px;
        line-height: 30px;

        .r_top10_hot_newType {
            margin-top: 7px;
            float: right;
            background: rgb(255, 148, 6);
            color: white;
            border-radius: 2px;
            width: 16px;
            height: 16px;
            font-size: 14px;
            text-align: center;
            line-height: 16px;
        }

        .r_top10_item_name {
            max-width: calc(100% - 90px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            font-size: 14px;
        }

        .r_top10_item_sum {
            display: inline-block;
            font-size: 12px;
            max-width: 50px;
            color: #939393;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

    }
}
</style>