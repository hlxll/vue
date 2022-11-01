<template>
    <div>
        <p v-custom-directive>响应式：{{ref1}}</p>
    </div>
</template>
<script setup>
import { ref, useSlots, useAttrs, defineProps, defineEmits, defineExpose } from 'vue'
let ref1 = ref('默认ref数据')

//自定义指令不用显示注册，但是命名必须v开头的驼峰式
let vCustomDirective = {
    mounted: () => {
        console.log('自定义指令')
    }
}

//defineProps和defineEmits都是只能在setup的script中使用，他们不需要引入，会随着编译被处理
defineProps({
    name: String
})
defineEmits(['changeName'])

//setup的script，默认是封闭的
defineExpose({
    ref1
})

const slots = useSlots()
const attrs = useAttrs()

</script>