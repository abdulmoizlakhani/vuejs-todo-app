<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
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
      />
      <br />
      <br />
      <button type="submit" :disabled="validateSignInForm">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      formData: {
        userEmail: "",
        userPass: "",
      },
    };
  },
  computed: {
    validateSignInForm() {
      const { userEmail, userPass } = this.formData;
      const isValidated = this.getTrimmedText(userEmail) || !userPass;
      return isValidated;
    },
  },
  methods: {
    signIn() {
      this.$parent.$parent.$emit("signIn", this.formData);
    },
    getTrimmedText(text) {
      return !text.trim();
    },
  },
};
</script>

<style scoped></style>
