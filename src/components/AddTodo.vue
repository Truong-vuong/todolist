<template>
  <form
    @submit.prevent="addItem"
    class="flex items-center justify-between gap-4 mb-4"
  >
    <input
      type="text"
      v-model="initData.title"
      placeholder="Todo..."
      class="outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      type="text"
      v-model="initData.person"
      placeholder="Person..."
      class="outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      type="date"
      v-model="initData.dateCompleted"
      placeholder="Completed..."
      class="outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      type="submit"
      value="Submit"
      class="btn-add btn bg-green-700 font-bold text-white p-2 rounded"
    />
  </form>
</template>

<script>
import { reactive, watch, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  props: {
    editItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props, context) {
    const store = useStore();
    const initData = {
      id: null,
      title: "",
      person: "",
      dateCompleted: "",
    };
    const initTodo = computed(() => {
      return store.state.todos.todo;
    });

    // watch(initData, (val) => {
    //   if (val.id) {
    //     Object.assign(initData, val);
    //   } else {
    //     initData.id = null;
    //     initData.title = "";
    //     initData.person = "";
    //     initData.dateCompleted = Date.now;
    //   }
    // });

    const addItem = () => {
      Object.assign(initData, initTodo);
      store.dispatch("addTodo", initData);
    };
    return {
      initData,
      addItem,
    };
  },
};
</script>

<style>
</style>