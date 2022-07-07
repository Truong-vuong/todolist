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
            orderByName: false,
            orderByDate: false,
            filter: ""
        }
    },
    getters: {
        filterComputed(state) {
            state.todos.filter(item => item.title.toLowerCase().includes(state.filter.toLowerCase()) ||
                item.person.toLowerCase().includes(state.filter.toLowerCase())
            )
        }

        // dataAffterSort: {
        //     if(state.isSortByName) {
        //         state.todos.sort((a, b) => {
        //             if (!pay) {
        //                 if (a.title < b.title) return -1;
        //                 if (a.title > b.title) return 1;
        //                 return 0;
        //             } else {
        //                 if (a.title < b.title) return 1;
        //                 if (a.title > b.title) return -1;
        //                 return 0;
        //             };
        //         });
        //     }
        // }
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
        sortName(context, pay) {
            context.commit('SORTNAME', pay)
            context.state.orderDirect = !context.state.orderDirect
        },
        sortDate(context, pay) {
            context.commit('SORTDATE', pay)
            context.state.orderDate = !context.state.orderDate
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
            state.todos.sort((a, b) => {
                if (!pay) {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                } else {
                    if (a.title < b.title) return 1;
                    if (a.title > b.title) return -1;
                    return 0;
                };
            });
        },
        SORTDATE(state, pay) {
            state.todos.sort((a, b) => {
                if (!pay) {
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
}

export default todosModule