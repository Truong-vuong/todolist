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
        <slot></slot>
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
              class="
                btn
                bg-orange-500
                px-1
                rounded
                ml-1
                text-xs
                flex
                items-center
              "
            >
              Name <i class="bx bxs-chevron-up" v-if="orderByName"></i>
              <i v-else class="bx bxs-chevron-down"></i>
            </button>
            <button
              @click="sortDate"
              class="
                btn
                bg-orange-500
                px-1
                rounded
                ml-1
                text-xs
                flex
                items-center
              "
            >
              Date <i class="bx bxs-chevron-up" v-if="orderByDate"></i>
              <i v-else class="bx bxs-chevron-down"></i>
            </button>
            <!-- <button
              @click="sortDefault"
              class="
                btn
                bg-orange-500
                px-1
                rounded
                ml-1
                text-xs
                flex
                items-center
              "
            >
              default <i class="bx bxs-chevron-down"></i>
            </button> -->
          </div>
        </div>
        <div
          class="info mt-4 w-full"
          v-for="todo in dataAffterSort"
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  setup() {
    const store = useStore();
    const dataAffterSort = computed(() => store.getters.dataAffterSort);
    const filter = ref("");
    let filterState = computed(() => store.state.todos.filter);
    const orderByName = computed(() => store.state.todos.orderByName);
    const orderByDate = computed(() => store.state.todos.orderByDate);

    watch(filter, (val) => {
      store.dispatch("filter", val);
    });

    const sortName = () => {
      store.dispatch("sortName", orderByName.value);
    };

    const sortDate = () => {
      store.dispatch("sortDate", orderByDate.value);
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

      sortName,
      sortDate,
      dataAffterSort,
      filter,
      orderByName,
      orderByDate,
      filterState,
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