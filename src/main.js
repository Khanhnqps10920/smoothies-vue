import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueAnime from 'vue-animejs';




Vue.config.productionTip = false;
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("auth/setUser", user);
});

Vue.use(VueAnime);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");