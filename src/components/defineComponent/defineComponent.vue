<template>
    <div>
        <p style="text-align:center;">defineComponent</p>
        <div>{{defineText}}</div>
        <p style="text-align:center;">defineAsync</p>
        <defineAsync></defineAsync>
        <p style="text-align:center;">customCom</p>
        <custom-com></custom-com>
    </div>
</template>
<script>
import { defineComponent, defineAsyncComponent, defineCustomElement, ref, h } from 'vue';
const defineAsync = defineAsyncComponent(() => {
    return import('./textCompon.vue')
})
const customCom = defineCustomElement({
    data() {
        return {
            name: 'defineCustom使用'
        }
    },
    setup() {
        const count = ref(0)
        return () => h('div', {
            onClick: ()=>count.value++
        },`点击${count.value}`)
    },
})
customElements.define('custom-com', customCom)

const defineCom = defineComponent({
    data() {
        return {
            defineText: 'defineComponet使用'
        }
    },
    components: {
        defineAsync
    },
    template: `<div>使用defineTemplate<div>`
})
defineCom.mounted = function () {
    console.log('defineComponent的mounted')
}
export default defineCom;

</script>