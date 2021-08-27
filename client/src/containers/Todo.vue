<template>
  <div>
    <UserGreetings :userFullName="userFullName" @signOut="$emit('signOut')" />
    <h2>Todo List App</h2>
    <AddTodo @addTodo="$emit('addTodo')"></AddTodo>
    <TodoList
      :todoList="todoList"
      @deleteTodo="$emit('deleteTodo')"
      @editTodo="$emit('editTodo')"
      @markAsDone="$emit('markAsDone')"
    ></TodoList>
  </div>
</template>

<script>
// components
import UserGreetings from "../components/UserGreetings.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoList from "../components/TodoList.vue";

export default {
  name: "Todo",
  components: {
    UserGreetings,
    AddTodo,
    TodoList,
  },
  props: ["userFullName", "todoList", "isAuthenticated"],
  emits: ["signOut", "addTodo", "markAsDone", "editTodo", "deleteTodo"],
  beforeMount() {
    if (!this.isAuthenticated) {
      this.$router.push("/sign-in");
    }
  },
};
</script>
