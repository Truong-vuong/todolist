<template>
  <div class="wrapper flex justify-center items-center">
    <div class="todos container bg-[#42b983] rounded p-4">
      <AddTodo />
      <button @click="onCreate" class="btn bg-orange-500 w-[160px] rounded p-2">
        Create Todo
      </button>

      <TodoItem @edit="handleEdit" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
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
    const onCreate = () => {
      editItem.id = null;
    };

    return {
      onCreate,
      todos,
    };
  },
};
</script>

<style>
</style>