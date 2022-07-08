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
            isSortByName: false,
            isSortByDate: false,
            orderByName: true,
            orderByDate: true,
            filter: ""
        }
    },
    getters: {
        getTodos(state) {
            return state.todos
        },
        filterComputed(state, getters) {
            return getters.getTodos.filter(item => item.title.toLowerCase().includes(state.filter.toLowerCase()) ||
                item.person.toLowerCase().includes(state.filter.toLowerCase())
            )
        },
        dataAffterSort(state, getters) {
            if (!state.isSortByName && !state.isSortByDate) {
                return getters.filterComputed
            }
            if (state.isSortByName) {
                return getters.filterComputed.sort((a, b) => {
                    if (!state.orderByName) {
                        if (a.title < b.title) return -1;
                        if (a.title > b.title) return 1;
                        return 0;
                    } else {
                        if (a.title < b.title) return 1;
                        if (a.title > b.title) return -1;
                        return 0;
                    };
                });
            } else if (state.isSortByDate) {
                return getters.filterComputed.sort((a, b) => {
                    if (!state.orderByDate) {
                        if (a.dateCompleted < b.dateCompleted) return -1;
                        if (a.dateCompleted > b.dateCompleted) return 1;
                        return 0;
                    } else {
                        if (a.dateCompleted < b.dateCompleted) return 1;
                        if (a.dateCompleted > b.dateCompleted) return -1;
                        return 0;
                    };
                });
            }
        }
    },
    actions: {
        deleteTodo(context, id) {
            context.commit('DELETE', id)
        },
        addTodo(context, newTodo) {
            context.commit('ADD', newTodo);
        },
        editTodo(context, id) {
            context.commit('EDIT', id)
        },
        filter(context, pay) {
            context.state.filter = pay;
        },
        sortName(context, pay) {
            context.commit("SORTNAME", pay)
        },
        sortDate(context, pay) {
            context.commit("SORTDATE", pay)
        }
    },
    mutations: {
        DELETE(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id)
        },
        ADD(state, newTodo) {
            if (!newTodo.id || !state.todos.find(todo => todo.id === newTodo.id)) {
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
        SORTNAME(state, pay) {
            state.isSortByName = true;
            state.isSortByDate = false;
            state.orderByName = !state.orderByName
        },

        SORTDATE(state, pay) {
            state.isSortByDate = true;
            state.isSortByName = false;
            state.orderByDate = !state.orderByDate
        }
    }
}

export default todosModule