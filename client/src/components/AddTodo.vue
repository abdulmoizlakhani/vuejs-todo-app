<template>
  <form @submit.prevent="addTodo">
    <label>Todo Text: </label>
    <input v-model.trim="todoText" />
    <button
      type="submit"
      style="margin-left: 10px"
      :disabled="validateTodoText"
    >
      Add
    </button>
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      todoText: "",
    };
  },
  computed: {
    validateTodoText() {
      return !this.todoText.trim();
    },
  },
  methods: {
    addTodo() {
      this.$emit("addTodo", this.todoText);
      this.todoText = "";
    },
  },
};
</script>
