<template>
  <div class="login form">
    <form @submit.prevent="handleSigninSubmit" class="card-panel">
      <h2 class="center purple-text draken-1">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn purple darken-1">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
// import database from "../../firebase/init";
import { mapState, mapActions } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState("auth", ["feedback"])
  },
  methods: {
    ...mapActions("auth", ["setFeedback"]),
    handleSigninSubmit() {
      if (this.email && this.password) {
        this.setFeedback(null);
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(e => {
            this.setFeedback(e.message);
          });
      } else {
        this.setFeedback("Please fullfill all input");
      }
    }
  }
};
</script>

<style>
</style>