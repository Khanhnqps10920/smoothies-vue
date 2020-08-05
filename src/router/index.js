import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddSmoothie from "../components/smoothies/AddSmoothie/AddSmoothie.vue";
import EditSmoothie from "../components/smoothies/EditSmoothie/EditSmoothie.vue";
import UserProfile from "../components/user/UserProfile.vue";
import OtherUserProfile from "../components/user/OtherUserProfile.vue";
import Gmap from "../views/Gmap.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Home",
  component: Home
},
{
  path: "/edit/:slug",
  name: "editSmoothie",
  component: EditSmoothie
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

{
  path: "/profile",
  name: "profile",
  component: UserProfile
},

{
  path: "/profile/:userId",
  name: "otherProfile",
  component: OtherUserProfile
},

{
  path: "/gmap",
  name: "map",
  component: Gmap
}
];

const router = new VueRouter({
  routes
});

export default router;