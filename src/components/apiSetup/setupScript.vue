<template>
    <div>
        <p v-custom-directive>响应式：{{ref1}}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue'
let ref1 = ref('默认ref数据')

//自定义指令不用显示注册，但是命名必须v开头的驼峰式
let vCustomDirective = {
    mounted: () => {
        console.log('自定义指令')
    }
}
</script>