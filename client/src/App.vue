<template>
  <div>
    <Auth
      v-if="!authenticated"
      :showSignUp="showSignUp"
      @updateShowSignUp="updateShowSignUp"
      @signUp="signUp"
      @signIn="signIn"
    />
    <Todo
      v-else
      :userFullName="user.userFullName"
      :todoList="user.todoList || []"
      @signOut="signOut"
      @addTodo="addTodo"
      @markAsDone="markAsDone"
      @editTodo="editTodo"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

// containers
import Auth from "./containers/Auth.vue";
import Todo from "./containers/Todo.vue";

export default {
  name: "App",
  components: {
    Auth,
    Todo,
  },
  data() {
    return {
      authenticated: false,
      user: null,
      showSignUp: true,
    };
  },
  methods: {
    // Auth Methods
    updateShowSignUp(status) {
      this.showSignUp = status;
    },
    signUp(data) {
      if (data) {
        this.user = data;
        this.showSignUp = false;
      }
    },
    signIn(data) {
      if (!this.user) {
        alert("User not found!");
      } else {
        const { userEmail, userPass } = data;
        const { userEmail: uEmail, userPass: uPass } = this.user;
        if (userEmail === uEmail && userPass === uPass) {
          this.authenticated = true;
        } else {
          alert("Invalid Credentials");
        }
      }
    },
    signOut() {
      this.authenticated = false;
      this.user = null;
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
