<template>
  <div class="wrapper flex justify-center items-center mt-10">
    <div class="todos container rounded p-4 bg-slate-200 w-[800px]">
      <AddTodo />
      <button @click="onCreate" class="btn bg-orange-500 w-[160px] rounded p-2">
        Create Todo
      </button>
      <TodoItem>Total: {{ todos.length }}</TodoItem>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AddTodo from "./AddTodo.vue";
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodosApp",
  components: {
    TodoItem,
    AddTodo,
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.state.todos.todos);
    const initTodo = computed(() => store.state.todos.todo);
    const onCreate = () => {
      initTodo.value.id = null;
      initTodo.value.title = "";
      initTodo.value.person = "";
      initTodo.value.dateCompleted = "";
    };

    return {
      onCreate,
      todos,
      initTodo,
    };
  },
};
</script>

<style>
</style>