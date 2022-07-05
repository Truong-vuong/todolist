<template>
  <div
    class="
      list
      flex flex-col
      items-center
      space-start
      bg-white
      rounded
      m-4
      w-[600px]
    "
  >
    <div class="function m-2 flex gap-1">
      <!-- <input
        type="text"
        v-model="filter"
        placeholder="filter"
        class="outline-none border-none p-1 text-orange-500 w-2/3"
      /> -->
      <div class="sort flex gap-2">
        <button @click="sortName" class="btn bg-orange-500 p-2 rounded ml-1">
          Name
        </button>
        <button @click="sortDate" class="btn bg-orange-500 p-2 rounded ml-1">
          Date
        </button>
      </div>
    </div>
    <div
      class="info flex space-between my-4 gap-4"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="text-xl text-cyan-800 font-semibold">
        {{ todo.title }}
      </div>
      <div class="text-xl text-cyan-800">{{ todo.person }}</div>
      <div class="text-xl text-cyan-800">{{ todo.dateCompleted }}</div>
      <div class="button flex gap-2">
        <button
          class="btn-edit btn bg-orange-500 text-white py-1 px-2 rounded"
          @click="editItem(todo.id)"
        >
          <i class="bx bx-edit-alt"></i>
        </button>
        <button
          class="btn-delete btn bg-red-500 text-white py-1 px-2 rounded"
          @click="deleteItem(todo.id)"
        >
          <i class="bx bx-x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  setup(_, context) {
    const store = useStore();

    let todos = computed(() => store.state.todos.todos);
    // const filter = "";
    // const todosComputed = computed(() =>
    //   todos.value.filter((item) => item.title.includes(filter))
    // );

    const sortName = () => {
      todos.value.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    };
    const sortDate = () => {
      todos.value.sort((a, b) => {
        if (a.dateCompleted < b.dateCompleted) return -1;
        if (a.dateCompleted > b.dateCompleted) return 1;
        return 0;
      });
    };

    const deleteItem = (id) => {
      store.dispatch("deleteTodo", id);
    };

    const editItem = (id) => {
      // context.emit("edit", id);
      store.dispatch("editTodo", id);
    };

    return {
      deleteItem,
      editItem,
      //filter,
      sortName,
      sortDate,
      todos,
      //todosComputed,
    };
  },
};
</script>

<style>
</style>