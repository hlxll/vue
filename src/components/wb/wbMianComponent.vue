<template>
    <div class="wbMainComponent">
        <div class="wb_type">
            <div v-for="item in typeList" :key="item.name" class="wb_type_item" @click="f_clickType(item)"
                :class="item.active?'wb_type_item_clicked':''">
                <div>{{item.name}}</div>
            </div>
            <div  class="wb_type_item" style="text-align:center;" @click="f_clickType(item)">
                <span class="iconfont icon-zichan1"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import {reactive} from 'vue'
export default {
    setup(props, node) {
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
        return {
            typeList,
            f_clickType
        }
    }
}
</script>
<style lang="scss" scoped>
.wbMainComponent{
    margin-top: 5px;
    width: 100%;
    position: absolute;
    left: 210px;
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
}
</style>