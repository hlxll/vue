//处理异步的mutation，提交mutation，可以包含任意异步操作
export default {
    asyncSetCount(context: { commit: (arg0: string) => void }) {
        setTimeout(() => {
            context.commit('setCount')
        }, 1000)
    }
}