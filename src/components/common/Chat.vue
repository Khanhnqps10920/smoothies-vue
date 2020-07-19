<template>
  <div class="chat">
    <div class="fixed-action-btn">
      <a @click="handleActiveChat" class="waves-effect purple wa btn">
        <i class="material-icons">chat_bubble_outline</i>
      </a>
    </div>
    <ChatScreen />
  </div>
</template>

<script>
import ChatScreen from "../chat/ChatScreen.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ChatScreen
  },
  methods: {
    ...mapActions("chat", ["setActive"]),
    handleActiveChat() {
      this.setActive();
    }
  }
};
</script>

<style>
</style>