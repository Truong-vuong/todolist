<template>
  <div class="container w-full h-full flex justify-center items-center">
    <div class="bg-slate-200 rounded p-8 mt-8 flex flex-col">
      <AddTodo :todos="todos" :item="editData" @onAdd="onAdd" />
      <button @click="onCreate" class="btn bg-orange-500 w-[160px] rounded p-2">
        Create Todo
      </button>
      <div class="function m-2 flex gap-1">
        <input
          type="text"
          v-model="filter"
          placeholder="filter"
          class="outline-none border-none p-1 text-orange-500 w-2/3"
        />
        <div class="sort">
          <button @click="sortName" class="btn bg-orange-500 p-2 rounded ml-1">
            Name
          </button>
          <button @click="sortDate" class="btn bg-orange-500 p-2 rounded ml-1">
            Date
          </button>
        </div>
      </div>

      <TodoItem
        v-for="todo in todosComputed"
        :key="todo.id"
        :todoProps="todo"
        @onDelete="handleDelete"
        @onEdit="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

import TodoItem from "./TodoItem.vue";
import AddTodo from "./AddTodo.vue";

export default {
  name: "TodosItem",
  components: { TodoItem, AddTodo },
  setup() {
    const todos = reactive({
      data: [
        {
          id: uuidv4(),
          title: "Nấu cơm",
          person: "Nam",
          dateCompleted: new Date("01/02/2018").toLocaleDateString(),
          completed: false,
        },
        {
          id: uuidv4(),
          title: "Học bài",
          person: "Vũ",
          dateCompleted: new Date("04/02/2021").toLocaleDateString(),
          completed: false,
        },
        {
          id: uuidv4(),
          title: "Quét nhà",
          person: "Anh",
          dateCompleted: new Date("07/04/2020").toLocaleDateString(),
          completed: false,
        },
      ],
    });

    const filter = ref("");
    const todosComputed = computed(() =>
      todos.data.filter((item) => item.title.includes(filter.value))
    );

    const sortName = () => {
      let data = todos.data;
      data.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    };

    const sortDate = () => {
      let data = todos.data;
      data.sort((a, b) => {
        if (a.dateCompleted < b.dateCompleted) return -1;
        if (a.dateCompleted > b.dateCompleted) return 1;
        return 0;
      });
    };

    const handleDelete = (id) => {
      todos.data = todos.data.filter((todo) => todo.id !== id);
    };

    const editData = reactive({});
    const handleEdit = (id) => {
      let item = todos.data.find((item) => item.id == id);
      Object.assign(editData, item);
    };

    // const AddTodoList = (newTodo) => {
    //   todos.data.push(newTodo);
    // };

    const onCreate = () => {
      editData.id = null;
    };

    // const editTodo = (updateItem) => {
    //   let newTodo = todos.data.find((todo) => todo.id == updateItem.id);
    //   if (newTodo) {
    //     newTodo.title = updateItem.title.value;
    //     newTodo.person = updateItem.person.value;
    //     newTodo.dateCompleted = updateItem.dateCompleted.value;
    //   }
    // };

    const onAdd = (val) => {
      if (!val.id) {
        val.id = uuidv4();
        todos.data.push(val);
      } else {
        var itemEdit = findItem(val.id);
        Object.assign(itemEdit, val);
      }
    };

    const findItem = (id) => {
      return todos.data.find((item) => item.id == id);
    };
    // watch(
    //   () => todoChild,
    //   () => {
    //     console.log("change");
    //   },
    //   { deep: true }
    // );
    return {
      todos,
      handleDelete,

      todosComputed,
      filter,
      sortName,
      sortDate,
      handleEdit,
      editData,
      onCreate,
      onAdd,
      findItem,
      // todoChild,
    };
  },
};
</script>

<style>
</style>