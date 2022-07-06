<template>
  <form
    @submit.prevent="addItem"
    class="flex items-center justify-between gap-4 mb-4"
  >
    <input
      required
      type="text"
      v-model="initTodo.title"
      placeholder="Todo..."
      class="outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      required
      type="text"
      v-model="initTodo.person"
      placeholder="Person..."
      class="btn outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      required
      type="date"
      v-model="initTodo.dateCompleted"
      placeholder="Completed..."
      class="btn outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      type="submit"
      value="Submit"
      class="btn bg-green-700 font-bold text-white p-2 rounded"
    />
  </form>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  setup() {
    const store = useStore();
    let initTodo = computed(() => store.state.todos.todo);
    const addItem = () => {
      const sendTodo = {};
      initTodo.value.title = initTodo.value.title.trim();
      initTodo.value.person = initTodo.value.person.trim();
      Object.assign(sendTodo, initTodo.value);
      store.dispatch("addTodo", sendTodo);
      initTodo.value.id = null;
      initTodo.value.title = "";
      initTodo.value.person = "";
      initTodo.value.dateCompleted = null;
    };

    return {
      addItem,
      initTodo,
    };
  },
};
</script>

<style>
</style>