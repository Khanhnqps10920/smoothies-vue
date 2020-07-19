<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Chat />
  </div>
</template>

<script>
import Navbar from "./components/common/Navbar";
import Chat from "./components/common/Chat.vue";

export default {
  components: {
    Navbar,
    Chat
  }
};
</script>

<style>
.form {
  max-width: 400px;
  margin: 60px auto;
}
.form h2 {
  font-size: 2.4em;
}
</style>
