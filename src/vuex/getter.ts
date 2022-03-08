//state派生出来的一下经过处理的状态
export default {
    doneTodos: (state: { count: number, todos: any[], name: string }) => {
        return state.todos.filter(todo => todo.done)
    }
}