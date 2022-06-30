<template>
  <div
    class="
      list
      w-[600px]
      flex
      items-center
      space-between
      h-[100px]
      bg-white
      rounded
      p-4
      m-4
      bl-
    "
  >
    <div class="info flex space-between">
      <div class="text-xl text-cyan-800 font-semibold">
        {{ todoProps.title }}
      </div>
      <div class="text-xl text-cyan-800">{{ todoProps.person }}</div>
      <div class="text-xl text-cyan-800">{{ todoProps.dateCompleted }}</div>
    </div>
    <div class="button flex gap-2">
      <button
        class="btn-edit btn bg-orange-500 text-white py-1 px-2 rounded"
        @click="editItem"
      >
        <i class="bx bx-edit-alt"></i>
      </button>
      <button
        class="btn-delete btn bg-red-500 text-white py-1 px-2 rounded"
        @click="deleteItem"
      >
        <i class="bx bx-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoProps"],
  setup(props, context) {
    const deleteItem = () => {
      context.emit("onDelete", props.todoProps.id);
    };

    const editItem = () => {
      context.emit("onEdit", props.todoProps.id);
    };

    return {
      deleteItem,
      editItem,
    };
  },
};
</script>

<style>
.list {
  display: flex;
  justify-content: space-between;
  border-left: 4px solid orange;
}
.info {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  align-items: center;
  width: 60%;
}
</style>