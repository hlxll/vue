<template>
    <div>
        <div class="menuItem" v-for="item in tipList" :class="item.active?'isClicked':''"
         :key="item.name" @click="changeRoute(item)">
            <span class="wbIcon iconSize"></span>
            <span>{{item.name}}</span>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineEmits, nextTick } from "vue";

let tipList = reactive([{
    name: '热门微博',
    active: false
},{
    name: '热门榜单',
    active: false
},{
    name: '话题榜',
    active: false
},{
    name: '热搜榜',
    active: false
}])

const emits = defineEmits(['changeRoute'])
const changeRoute = function (item) { 
    tipList.forEach(node => {
        node.active = false
        if (node.name == item.name) {
            node.active = true
        }
    })
    emits('changeRoute', item)
}
</script>
<style scoped lang="scss">
.menuItem{
    height: 40px;
    line-height: 24px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: left;
    margin: 0 5px;
    cursor: pointer;
    &:hover{
        background-color: rgba(242,242,242,.6);
    }
}
.isClicked{
    color: #eb7350;
}
.iconSize{
    width: 24px;
    height: 24px;
    margin-right: 18px;
}
</style>