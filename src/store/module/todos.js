import { v4 as uuidv4 } from "uuid";
const todosModule = {
    state: {
        todo: {
            id: null,
            title: "",
            person: "",
            dateCompleted: "",
        },
        todos: [{
                id: uuidv4(),
                title: 'Quet nha',
                person: 'John',
                dateCompleted: new Date("2019/01/02").toLocaleDateString(),
            },
            {
                id: uuidv4(),
                title: 'Rau bat',
                person: 'Fill',
                dateCompleted: new Date("2017/05/02").toLocaleDateString(),
            },
            {
                id: uuidv4(),
                title: 'Nau com',
                person: 'Nam',
                dateCompleted: new Date("2022/01/07").toLocaleDateString(),
            },
        ]
    },
    getters: {},
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
                state.todo.title = '';
                state.todo.id = null;
                state.todo.person = '';
                state.todo.dateCompleted = '';
            } else {
                var itemEdit = state.todos.find(todo => todo.id === newTodo.id);
                Object.assign(itemEdit, newTodo);
            }

        },
        EDIT(state, id) {
            let obj = state.todos.find(item => item.id == id);
            state.todo = obj
                // console.log(state.todo);
                // state.todo.title = obj.title;
                // state.todo.id = obj.id;
                // state.todo.person = obj.person;
                // state.todo.dateCompleted = obj.dateCompleted;
        },
    },

}

export default todosModule