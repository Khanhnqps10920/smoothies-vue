<template>
  <nav class="purple draken-1">
    <div class="nav-wrapper container">
      <a href="#" class="brand-logo left">Smoothie</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/smoothies">Smoothies</router-link>
        </li>
        <li>
          <router-link to="/gmap">Gmap</router-link>
        </li>
        <li v-if="!isLogin">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-else>
          <a @click="signout">Signout</a>
        </li>
        <li v-if="!isLogin">
          <router-link to="/register">Register</router-link>
        </li>
      </ul>

      <router-link
        :to="{ name: 'addSmoothie' }"
        v-if="isLogin"
        class="btn-add btn-floating btn-large purple darken-1 halfway-fab"
      >
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapState("auth", ["isLogin"])
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-add {
  bottom: -60px !important;
}
</style>