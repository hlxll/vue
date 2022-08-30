//state唯一的修改方法，使用commit触发这个方法，可以传参
//必须是同步的

export default {
    setCount(state: { count: number, todos: any[], name: string }, a: any) {
        state.count++
    },
    setColor(state: { whiteAndBlock: boolean }, param: { whiteAndBlock: boolean }) {
        state.whiteAndBlock = param.whiteAndBlock
    },
    setLogin(state: { isLogin: boolean }, param: { isLogin: boolean }) {
        state.isLogin = param.isLogin
    }
}