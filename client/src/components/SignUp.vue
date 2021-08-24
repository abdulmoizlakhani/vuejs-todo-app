<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <label for="userFullName">Full Name: </label>
      <input
        name="userFullName"
        type="text"
        v-model.trim="formData.userFullName"
        required
      />
      <br />
      <br />
      <label for="userEmail">Email: </label>
      <input
        name="userEmail"
        type="email"
        v-model.trim="formData.userEmail"
        required
      />
      <br />
      <br />
      <label for="userPass">Password: </label>
      <input
        name="userPass"
        type="password"
        v-model="formData.userPass"
        required
        min="8"
      />
      <br />
      <br />
      <label for="userConfirmPass">Confirm Password: </label>
      <input
        name="userConfirmPass"
        type="password"
        v-model="formData.userConfirmPass"
        required
        min="8"
      />
      <br />
      <br />
      <button type="submit" :disabled="validateSignUpForm">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        userFullName: "",
        userEmail: "",
        userPass: "",
        userConfirmPass: "",
        todoList: [],
      },
    };
  },
  computed: {
    validateSignUpForm() {
      const isValidated =
        this.getTrimmedText(this.formData.userFullName) ||
        this.getTrimmedText(this.formData.userEmail) ||
        this.getTrimmedText(this.formData.userPass) ||
        this.getTrimmedText(this.formData.userConfirmPass);
      return isValidated;
    },
  },
  methods: {
    getTrimmedText(text) {
      return !text.trim();
    },
    signUp() {
      const { userPass, userConfirmPass } = this.formData;

      if (userPass !== userConfirmPass) {
        alert("Password mismatched! Both passwords must be same");
      } else {
        this.$parent.$emit("signUp", this.formData);
      }
    },
  },
};
</script>
