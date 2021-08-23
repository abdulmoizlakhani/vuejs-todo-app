<template>
  <div>
    <Auth
      v-if="!authenticated"
      :showSignUp="showSignUp"
      @updateShowSignUp="updateShowSignUp"
      @signUp="signUp"
      @signIn="signIn"
    />
    <Todo v-else :userFullName="user.userFullName" @signOut="signOut" />
  </div>
</template>

<script>
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
    toggleUserAuthentication(status) {
      this.authenticated = status;
    },
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
  },
};
</script>
