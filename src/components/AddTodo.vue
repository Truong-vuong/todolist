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
import { useStore, mapState } from "vuex";

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
    const initTodo = computed(() => store.state.todos.todo);

    console.log(initTodo.value);

    // onUpdated(() => {
    //   if (initTodo.id) {
    //     Object.assign(initData, initTodo);
    //   } else {
    //     initData.id = uuidv4();
    //     initData.title = "";
    //     initData.person = "";
    //     initData.dateCompleted = Date.now;
    //   }
    // }),
    const addItem = () => {
      const sendTodo = {};
      if (!initTodo.value.id) {
        Object.assign(sendTodo, initData);
      } else {
        Object.assign(sendTodo, initTodo.value);
      }

      store.dispatch("addTodo", sendTodo);
      // initTodo.id = null;
      // initTodo.title = "";
      // initTodo.person = "";
      // initTodo.dateCompleted = null;
    };
    return {
      initData,
      addItem,
      initTodo,
    };
  },
};
</script>

<style>
</style>