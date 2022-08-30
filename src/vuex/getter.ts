import { ColorPicker } from "element-ui"

//state派生出来的一下经过处理的状态
export default {
    doneTodos: (state: { count: number, todos: any[], name: string }) => {
        return state.todos.filter(todo => todo.done)
    },
    getColor: (state: { color: string, bgColor: string }) => {
        return state
    }
}