import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddSmoothie from "../components/smoothies/AddSmoothie/AddSmoothie.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Home",
  component: Home
},
{
  path: "/edit",
  name: "editSmoothie",
  component: Home
},
{
  path: "/add-smoothie",
  name: "addSmoothie",
  component: AddSmoothie
},
{
  path: "/login",
  name: "login",
  component: Login
},
{
  path: "/register",
  name: "register",
  component: Register
},
];

const router = new VueRouter({
  routes
});

export default router;