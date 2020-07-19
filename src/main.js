import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";


Vue.config.productionTip = false;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  store.dispatch("auth/setUser", user);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");