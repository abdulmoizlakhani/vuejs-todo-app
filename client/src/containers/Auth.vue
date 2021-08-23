<template>
  <div>
    <button @click="$emit('updateShowSignUp', true)">Sign Up</button>
    <button class="ml7_5" @click="$emit('updateShowSignUp', false)">
      Sign In
    </button>
    <SignUp v-if="showSignUp" @signUp="$emit('signUp')" />
    <SignIn v-else @signIn="$emit('signIn')" />
  </div>
</template>

<script>
// components
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";

export default {
  name: "Auth",
  components: {
    SignUp,
    SignIn,
  },
  props: ["showSignUp"],
  emits: ["updateShowSignUp", "signUp", "signIn"],
};
</script>

<style scoped>
.ml7_5 {
  margin-left: 7.5px;
}
</style>
