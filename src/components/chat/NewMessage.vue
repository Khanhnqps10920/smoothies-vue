<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add)</label>
      <input type="text" name="message" v-model="bindMessage" />
      <p class="red-text" v-if="feedBack">{{ feedBack }}</p>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import database from "../../firebase/init";

export default {
  computed: {
    ...mapState("chat", ["name", "newMessage", "feedBack"]),
    ...mapState("auth", ["isLogin", "user"]),
    bindMessage: {
      get() {
        return this.newMessage;
      },
      set(value) {
        this.changeMessage(value);
      }
    }
  },

  methods: {
    ...mapActions("chat", ["changeMessage", "changeFeedBack"]),
    addMessage() {
      if (this.isLogin) {
        if (this.newMessage) {
          // reset feed back
          this.changeFeedBack(null);

          // add new message
          database
            .collection("messages")
            .add({
              content: this.newMessage,
              name: this.user.email,
              timestamp: Date.now()
            })
            .then(ref => {
              console.log("add new document to collections message", ref.id);
            })
            .catch(e => {
              console.log(e);
            });

          // reset new message
          this.changeMessage(null);
        } else {
          this.changeFeedBack("You must enter a message first");
        }
      } else {
        this.changeFeedBack("You must sign in to chat");
      }
    }
  }
};
</script>

<style>
</style>