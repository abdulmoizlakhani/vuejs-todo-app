<template>
  <div>
    <UserGreetings :userFullName="userFullName" @signOut="$emit('signOut')" />
    <h2>Todo List App</h2>
    <AddTodo @addTodo="addTodo"></AddTodo>
    <TodoList
      :todoList="todoList"
      @deleteTodo="deleteTodo"
      @editTodo="editTodo"
      @markAsDone="markAsDone"
    ></TodoList>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

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
  data() {
    return {
      todoList: [],
    };
  },
  props: ["userFullName"],
  emits: ["signOut"],
  methods: {
    addTodo(text) {
      const newTodo = { id: uuidv4(), text, editMode: false, done: false };
      this.todoList.push(newTodo);
    },
    markAsDone(todoId, status) {
      const updatedTodoList = this.todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: status };
        } else {
          return todo;
        }
      });
      this.todoList = updatedTodoList;
    },
    editTodo(todoId, status, value) {
      const updatedTodoList = this.todoList.map((todo) => {
        if (todo.id === todoId) {
          const updatedTodo = { ...todo, editMode: status };
          if (value) {
            updatedTodo.text = value;
          }
          return updatedTodo;
        } else {
          return todo;
        }
      });
      this.todoList = updatedTodoList;
    },
    deleteTodo(todoId) {
      const updatedTodoList = this.todoList.filter(
        (todo) => todo.id !== todoId
      );
      this.todoList = updatedTodoList;
    },
  },
};
</script>
