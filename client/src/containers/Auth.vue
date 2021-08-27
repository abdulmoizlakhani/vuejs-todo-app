<template>
  <div>
    <button @click="$router.push('/')">Sign Up</button>
    <button class="ml7_5" @click="$router.push('/sign-in')">
      Sign In
    </button>
    <router-view
      @signUp="$emit('signUp')"
      @signIn="$emit('signIn')"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "Auth",
  props: ["isAuthenticated"],
  emits: ["signUp", "signIn"],
  beforeMount() {
    if (this.isAuthenticated) {
      this.$router.push("/todo");
    }
  },
};
</script>

<style scoped>
.ml7_5 {
  margin-left: 7.5px;
}
</style>
