import { v4 as uuidv4 } from "uuid";
const todosModule = {
    state() {
        return {
            counter: 0,
            todo: {
                id: null,
                title: "",
                person: "",
                dateCompleted: "",
            },
            todos: [],
        }
    },
    getters: {
        available(state) {
            return state.todo
        }
    },
    actions: {
        deleteTodo(context, id) {
            context.commit('DELETE', id)
        },
        addTodo(context, newTodo) {
            context.commit('ADD', newTodo)
        },
        editTodo(context, id) {
            context.commit('EDIT', id)
        },
    },
    mutations: {
        DELETE(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id)
        },
        ADD(state, newTodo) {
            if (!newTodo.id) {
                newTodo.id = uuidv4();
                state.todos.push(newTodo);
            } else {
                var itemEdit = state.todos.find(todo => todo.id === newTodo.id);
                Object.assign(itemEdit, newTodo);
            }
        },
        EDIT(state, id) {
            let obj = state.todos.find(item => item.id == id);
            Object.assign(state.todo, obj)
        },
    },

}

export default todosModule