<template>
  <div>
    <router-view
      :isAuthenticated="isAuthenticated"
      :userFullName="user?.userFullName"
      :todoList="user?.todoList || []"
      @signUp="signUp"
      @signIn="signIn"
      @signOut="signOut"
      @addTodo="addTodo"
      @markAsDone="markAsDone"
      @editTodo="editTodo"
      @deleteTodo="deleteTodo"
    ></router-view>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
      user: null,
    };
  },
  methods: {
    // Auth Methods
    signUp(data) {
      if (data) {
        this.user = data;
        this.$router.push("/sign-in");
      }
    },
    signIn(data) {
      if (!this.user) {
        alert("User not found!");
      } else {
        const { userEmail, userPass } = data;
        const { userEmail: uEmail, userPass: uPass } = this.user;
        if (userEmail === uEmail && userPass === uPass) {
          this.isAuthenticated = true;
          this.$router.push("/todo");
        } else {
          alert("Invalid Credentials");
        }
      }
    },
    signOut() {
      this.isAuthenticated = false;
      this.user = null;
      this.$router.push("/");
    },

    // Todo Methods
    addTodo(text) {
      const newTodo = { id: uuidv4(), text, editMode: false, done: false };
      this.user.todoList.push(newTodo);
    },
    markAsDone(todoId, status) {
      const updatedTodoList = this.user.todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: status };
        } else {
          return todo;
        }
      });
      this.user.todoList = updatedTodoList;
    },
    editTodo(todoId, status, value) {
      const updatedTodoList = this.user.todoList.map((todo) => {
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
      this.user.todoList = updatedTodoList;
    },
    deleteTodo(todoId) {
      const updatedTodoList = this.user.todoList.filter(
        (todo) => todo.id !== todoId
      );
      this.user.todoList = updatedTodoList;
    },
  },
};
</script>
