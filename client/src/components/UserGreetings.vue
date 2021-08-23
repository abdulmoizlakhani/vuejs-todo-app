<template>
  <div class="greetings-container">
    <p>Hi, {{ userFullName }}!</p>
    <button type="button" class="ml7_5" @click="$parent.$emit('signOut')">
      Sign Out
    </button>
  </div>
</template>

<script>
export default {
  name: "UserGreetings",
  props: ["userFullName"],
};
</script>

<style scoped>
.greetings-container {
  display: flex;
  align-items: center;
}
.ml7_5 {
  margin-left: 7.5px;
}
</style>
