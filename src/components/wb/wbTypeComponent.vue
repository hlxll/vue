<template>
    <div>
        <div class="menuItem" v-for="item in tipList" :key="item">
            <span class="wbIcon iconSize"></span><span>{{item}}</span>
        </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";

let tipList = ['热门微博', '热门榜单', '话题榜', '热搜榜']
</script>
<style scoped>
.menuItem{
    height: 40px;
    line-height: 24px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: left;
    margin: 0 5px;
}
.menuItem:hover{
    background-color: #f2f2f2;
}
.iconSize{
    width: 24px;
    height: 24px;
    margin-right: 18px;
}
</style>