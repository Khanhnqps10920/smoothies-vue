<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
