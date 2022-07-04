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
import { reactive, ref, watch, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddTodo",
  props: {
    todos: {
      type: Object,
      default() {
        return {};
      },
    },
    item: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, context) {
    const initData = reactive({
      id: null,
      title: "",
      person: "",
      dateCompleted: "",
    });

    watch(props.item, (val) => {
      if (val.id) {
        Object.assign(initData, val);
      } else {
        initData.id = null;
        initData.title = "";
        initData.person = "";
        initData.dateCompleted = Date.now;
      }
    });

    const addItem = () => {
      // let newItem = {
      //   id: uuidv4(),
      //   title: title.value,
      //   person: person.value,
      //   dateCompleted: dateCompleted.value,
      // };
      // context.emit("add-item", newItem);
      const emitData = Object.assign({}, initData);
      context.emit("onAdd", emitData);
      initData.title = "";
      initData.dateCompleted = null;
      initData.person = "";
      initData.id = null;
    };

    return {
      addItem,
      initData,
    };
  },
};
</script>

<style>
</style>