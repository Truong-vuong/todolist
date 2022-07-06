<template>
  <div>
    <div class="box">
      <div
        class="
          list
          flex flex-col
          items-center
          space-start
          bg-white
          rounded
          m-4
          w-[500px]
          p-4
        "
      >
        <div class="function m-2 flex gap-1 w-full">
          <input
            type="text"
            v-model="filter"
            placeholder="filter"
            class="p-1 text-orange-500 w-2/3 outline-none"
          />
          <div class="sort flex gap-2">
            <button
              @click="sortName"
              class="btn bg-orange-500 p-2 rounded ml-1"
            >
              Name
            </button>
            <button
              @click="sortDate"
              class="btn bg-orange-500 p-2 rounded ml-1"
            >
              Date
            </button>
          </div>
        </div>
        <slot></slot>
        <div
          class="info mt-4 w-full"
          v-for="todo in todosComputed"
          :key="todo.id"
        >
          <div class="text-xl text-cyan-800 font-semibold">
            {{ todo.title }}
          </div>
          <div class="text-xl text-cyan-800">{{ todo.person }}</div>
          <div class="text-xl text-cyan-800">
            {{ new Date(todo.dateCompleted).toLocaleDateString() }}
          </div>
          <div class="button flex gap-2">
            <button
              class="bg-orange-500 text-white py-1 px-2 rounded"
              @click="editItem(todo.id)"
            >
              E
            </button>
            <button
              class="bg-red-500 text-white py-1 px-2 rounded"
              @click="deleteItem(todo.id)"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  setup() {
    const store = useStore();
    const todos = computed(() => store.state.todos.todos);
    const filter = ref("");
    const todosComputed = computed(() =>
      todos.value.filter((item) =>
        item.title.toLowerCase().includes(filter.value)
      )
    );

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
      store.dispatch("editTodo", id);
    };

    return {
      deleteItem,
      editItem,
      filter,
      sortName,
      sortDate,
      todosComputed,
      todos,
    };
  },
};
</script>

<style>
.function {
  border: 2px solid green;
  border-radius: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  border: 1px solid green;
  border-left: 4px solid orange;
  border-radius: 3px;
}
</style>