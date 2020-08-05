import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueAnime from "vue-animejs";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";

Vue.config.productionTip = false;

// geolocation  
Vue.use(VueGeolocation);

// anime js
Vue.use(VueAnime);

// google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7Gzu-LFR_KrB8SWdR2QkhlTGVUT89gfA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
});

// wait for firebase auth init before creating the app 

let app = null;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("auth/setUser", user);

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
