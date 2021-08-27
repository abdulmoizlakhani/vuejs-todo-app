<template>
  <ul>
    <li v-for="todo in todoList" :key="todo.id" style="margin-top: 10px">
      <div v-if="!todo.editMode" style="display: inline-block">
        <span :class="todo.done ? 'todo-done' : ''">{{ todo.text }}</span>
        <button
          v-if="!todo.done"
          class="ml7_5"
          @click="markAsDone(todo.id, true)"
        >
          Mark as Done
        </button>
        <button v-else class="ml7_5" @click="markAsDone(todo.id, false)">
          Mark as Undone
        </button>
        <button v-if="!todo.done" class="ml7_5" @click="editTodo(todo, true)">
          Edit
        </button>
        <button class="ml7_5" @click="deleteTodo(todo.id)">
          Delete
        </button>
      </div>
      <form ref="todoEditForm" v-else @submit.prevent="saveTodo(todo)">
        <input :name="todo.id" v-model.trim="todosToEdit[todo.id]" autofocus />
        <button
          class="ml7_5"
          type="submit"
          :disabled="validateTodoText(todo.id)"
        >
          Save
        </button>
        <button type="button" class="ml7_5" @click="editTodo(todo, false)">
          Cancel
        </button>
      </form>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todoList"],
  data() {
    return {
      todosToEdit: {},
    };
  },
  methods: {
    markAsDone(id, status) {
      this.$parent.$parent.$emit("markAsDone", id, status);
    },
    editTodo(todo, status, value) {
      if (status) {
        this.todosToEdit[todo.id] = todo.text;
      } else {
        delete this.todosToEdit[todo.id];
      }
      this.$parent.$parent.$emit("editTodo", todo.id, status, value);
    },
    deleteTodo(id) {
      this.$parent.$parent.$emit("deleteTodo", id);
    },
    saveTodo(todo) {
      this.editTodo(todo, false, this.todosToEdit[todo.id]);
    },
    validateTodoText(id) {
      return !this.todosToEdit[id].trim();
    },
  },
};
</script>

<style scoped>
.ml7_5 {
  margin-left: 7.5px;
}
.todo-done {
  text-decoration: line-through;
}
</style>
