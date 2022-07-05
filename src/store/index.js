import { createStore } from 'vuex'

import todos from './module/todos.js'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        todos,
    }
})