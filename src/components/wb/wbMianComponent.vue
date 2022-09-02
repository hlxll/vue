<template>
    <div class="wbMainComponent">
        <div class="wb_type">
            <div v-for="item in typeList" :key="item.name" class="wb_type_item" @click="f_clickType(item)"
                :class="item.active?'wb_type_item_clicked':''">
                <div>{{item.name}}</div>
            </div>
            <div class="wb_type_item" style="text-align:center;" @click="f_clickType(item)">
                <span class="iconfont icon-zichan1"></span>
            </div>
        </div>
        <div class="update_wb">
            <p class="timeUpdate">实时更新榜单</p>
            <div v-for="item in topList" :key="item.id" class="wb_content_item">
                <div class="peopleImg">
                    <div class="img">
                        <img :src="item.people_img" />
                        <div class="imgHover"></div>
                    </div>
                    <span class="iconfont icon-collapse-down-bg positionIcon"
                        :title="item.authentication == 1 ? '微博官方认证' :'微博个人认证'"></span>
                    <div class="wb_title">
                        <div>{{item.name}}</div>
                        <div>
                            <span>{{ timeRule(item.createTime) }}</span>
                            <span>{{ item.fromData }}</span>
                        </div>
                    </div>
                    <div class="followUser">
                        <span class="iconfont icon-adder"></span>
                        <span>关注</span>
                    </div>
                </div>
                <div class="textContent">
                    <span v-for="(text, index) in item.content" :key="index"
                        :style="{ 'color': text.type == 6 ? '#333' : '#eb7340' }">
                        <span class="iconfont" :class="f_iconType(text.type)"></span>
                        {{ f_iconType(text) }}
                    </span>
                </div>
                <div class="wb_content_video">
                    <div v-for="video in item.data" :key="video.url"
                        :class="video.type == 1 ? 'allChildVideo' :'allChildImg'">
                        <div v-if="video.type == 1">
                            <video :src="video.url" style="width: 100%;"></video>
                            <span class="seeSum">{{ changeNumType(item.seeSum) }}次观看</span>
                        </div>
                        <div v-else class="data_img">
                            <img :src="video.url" />
                        </div>
                    </div>
                    <div class="wb_main_foot">
                        <div>
                            <span class="iconfont icon-attribute" title="转发"></span>
                            {{ changeNumType(item.forwardSum) }}
                        </div>
                        <div>
                            <span class="iconfont icon-xian-buguize-xiaoxi" title="评论"></span>
                            {{ changeNumType(item.commentSum) }}
                        </div>
                        <div>
                            <span class="iconfont icon-dianzan" title="点赞"></span>
                            {{ changeNumType(item.thumgSum) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive, Directive} from 'vue'
export default {
    setup(props, node) {
        // 顶部类型
        let typeList = reactive([{
            name: '热门',
            active: false,
        },{
            name: '同城',
            active: false,
        },{
            name: '榜单',
            active: false,
        },{
            name: '明星',
            active: false,
        },{
            name: '抗疫',
            active: false,
        },{
            name: '搞笑',
            active: false,
        },{
            name: '情感',
            active: false,
        }])
        
        function f_clickType(item) {
            typeList.forEach(node => {
                if (item.name == node.name) {
                    node.active = true
                } else {
                    node.active = false
                }
            })
        }


        // 榜单部分
        let topList = reactive([])
        topList.push({
            id: 1,
            people_img: require('../../../public/image/1_img.jpg'),
            name: '杨紫工作室',
            fromData: '演员杨紫工作室官博',
            authentication: 1,//1是官方，2是个人，3是没认证
            createTime: new Date(2022,8,1,0,0,0),
            //1微博主页，2某条微博，3@某个人，4视频，5音乐， 6普通文字
            content: [{ type: 1, text: '杨紫超话' },
                { type: 2, text: '杨紫沉香重华' },
                { type: 6, text: '行走葱郁草原，跨过广袤荒野。跟着“今日导游”颜淡' },
                { type: 3, text: '杨紫' },
                { type: 6, text: '感受自然风光，欢迎来到美丽的新疆（风沙较大可适当调低音量' },
                { type: 2, text: '杨紫颜淡' },
                { type: 2, text: '杨紫新疆游vlog' },
                { type: 4, text: '杨紫工作室的微博视频' },],
                //1视频，2相片
            data: [{ type: 2, url: 'https://wx3.sinaimg.cn/orj360/006pz9M8ly1h5puagska0j30n61b7jwt.jpg' },
                { type: 2, url: 'https://wx3.sinaimg.cn/orj360/006pz9M8ly1h5puagska0j30n61b7jwt.jpg' },
                { type: 2, url: 'https://wx3.sinaimg.cn/orj360/006pz9M8ly1h5puagska0j30n61b7jwt.jpg' },
                { type: 2, url: 'https://wx3.sinaimg.cn/orj360/006pz9M8ly1h5puagska0j30n61b7jwt.jpg' },
                { type: 2, url: 'https://wx3.sinaimg.cn/orj360/006pz9M8ly1h5puagska0j30n61b7jwt.jpg' }],
            seeSum: 611000,//播放次数
            forwardSum: 17000,//转发次数
            commentSum: 95000,//评论次数
            thumgSum: 10000//点赞次数
        })
        topList.push({
            id: 1,
            people_img: require('../../../public/image/1_img.jpg'),
            name: '杨紫工作室',
            fromData: '演员杨紫工作室官博',
            authentication: 1,//1是官方，2是个人，3是没认证
            createTime: new Date(2022, 8, 1, 0, 0, 0),
            //1微博主页，2某条微博，3@某个人，4视频，5音乐， 6普通文字
            content: [{ type: 1, text: '杨紫超话' },
            { type: 2, text: '杨紫沉香重华' },
            { type: 6, text: '行走葱郁草原，跨过广袤荒野。跟着“今日导游”颜淡' },
            { type: 3, text: '杨紫' },
            { type: 6, text: '感受自然风光，欢迎来到美丽的新疆（风沙较大可适当调低音量' },
            { type: 2, text: '杨紫颜淡' },
            { type: 2, text: '杨紫新疆游vlog' },
            { type: 4, text: '杨紫工作室的微博视频' },],
            //1视频，2相片
            data: [{ type: 1, url: 'https://a.sinaimg.cn/mintra/pic/2112130543/weibo_login.mp4' }],
            seeSum: 611000,//播放次数
            forwardSum: 17000,//转发次数
            commentSum: 95000,//评论次数
            thumgSum: 200//点赞次数
        })
        function timeRule(time){
            let today = new Date().getTime()
            let createDay = time.getTime()
            if (today - createDay > 24 * 60 * 60 * 1000) {
                return '24小时前'
            } else {
                let result = ''
                result += time.getMonth() + 1 + '-'
                result += time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
                return result
            }
        }
        //判断不同数据使用的图标
        function f_iconType(type) {
            if (typeof type == 'object') {
                if (type.type == 2) {
                    return '#' + type.text + '#'+' '
                } else if (type.type == 3) { 
                    return '@' + type.text
                }
                else {
                    return type.text
                }
            }
            if (type == 6) {
                return ''
            }
            if (type == 1) {
                return 'icon-function'
            }
            if (type == 2) {
                return ''
            }
            if (type == 3) {
                return ''
            }
            if (type == 4) {
                return 'icon-shipin'
            }
            if (type == 5) {
                return 'icon-a-bofangxianxing'
            }
        }
        //改变数字规则
        function changeNumType(num) {
            if (num >= 10000) {
                return num/10000 +'万'
            } else {
                return num
            }
        }
        return {
            typeList,
            f_clickType,
            topList,
            timeRule,
            f_iconType,
            changeNumType
        }
    }
}
</script>
<style lang="scss" scoped>

.wbMainComponent{
    width: 100%;
    .wb_type{
        width: 100%;
        display: flex;
        height: 40px;
        line-height: 40px;
        .wb_type_item_clicked{
            color: #eb7350;
            font-weight: 800;
        }
        .wb_type_item{
            width: 12%;
            height: 40px;
            line-height: 40px;
            div{
                height: 30px;
                line-height: 30px;
                width: 90%;
                margin: auto;
                margin-top: 5px;
                cursor: pointer;
                border-radius: 15px;
                text-align: center;
                &:hover{
                    background-color: rgba(232, 77, 77, 0.5);
                    color: #eb7350;
                }
            }
        }
    }
    .update_wb{
        margin-top: 10px;
        padding: 0 20px;
        .timeUpdate{
            border-bottom: 1px solid #f9f9f9;
            color: rgb(147, 147,147);
            font-size: 12px;
        }
        .wb_content_item{
            margin-bottom: 10px;
            width: 100%;
            .peopleImg{
                height: 50px;
                display: flex;
                position: relative;
                .positionIcon{
                    position: absolute;
                    bottom: 0;
                    left: 30px;
                    color: #52afff;
                }
                .img{
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    overflow: hidden;
                    &:hover{
                        background-color: #ddd;
                        position: relative;
                        .imgHover{
                            position: absolute;
                        }
                    }
                    img{
                        width: 50px;
                        height: 50px;
                    }
                    .imgHover{
                        top: 0;
                        left: 0;
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        background-color: rgba(0,0,0,0.3);

                    }
                }
                .wb_title{
                    height: 50px;
                    line-height: 20px;
                    padding-top: 10px;
                    :nth-child(2){
                        color: rgb(147, 147,147);
                        font-size: 12px;
                        span{
                            margin-right: 5px;
                        }
                    }
                }
                .followUser{
                    margin-left: auto;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 64px;
                    border-radius: 14px;
                    color: rgb(255, 130, 0);
                    background-color: transparent;
                    border: 1px solid rgb(255, 130, 0);
                    font-size: 12px;
                }
            }
            .textContent{
                padding-left: 50px;
                line-height: 25px;
            }
            .wb_content_video{
                padding-left: 50px;
                display: flex;
                flex-wrap: wrap;
                
                .allChildImg{
                    width: calc(25% - 5px);
                    padding-right: 5px;
                    margin-bottom: 5px;
                }
                .allChildVideo {
                    width: 100%;
                    padding-right: 5px;
                    margin-bottom: 5px;
                    position: relative;
                    .seeSum {
                        position: absolute;
                        bottom: 10px;
                        left: 20px;
                        font-size: 12px;
                        color: white;
                    }
                }
                .data_img{
                    width: 100%;
                    height: 130px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        cursor: zoom-in;
                    }
                }
                .wb_main_foot {
                    display: flex;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    div {
                        width: 30%;
                        color: rgb(144,144,144);
                        text-align: left;
                        cursor: pointer;
                    }

                    div:hover {
                        color: #eb7350;
                    }
                }
                
            }
        }
    }
}
</style>