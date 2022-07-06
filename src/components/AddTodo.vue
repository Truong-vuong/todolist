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
      class="outline-none border-none p-2 text-green-700 font-bold"
    />
    <input
      required
      type="date"
      v-model="initTodo.dateCompleted"
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
import { reactive, ref, watch, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";

export default {
  name: "TodoItem",
  setup(props, context) {
    const store = useStore();
    // const initData = {
    //   id: null,
    //   title: "",
    //   person: "",
    //   dateCompleted: "",
    // };

    let initTodo = computed(() => store.state.todos.todo);
    // const initTodo = ref(store.getters);

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

      Object.assign(sendTodo, initTodo.value);
      // initTodo.value.id = null;
      // initTodo.value.title = "";
      // initTodo.value.person = "";
      // initTodo.value.dateCompleted = null;

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