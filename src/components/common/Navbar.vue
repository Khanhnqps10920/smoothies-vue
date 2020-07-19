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
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </ul>

      <button class="btn-add btn-floating btn-large purple darken-1 halfway-fab">
        <i class="material-icons">add</i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-add {
  bottom: -60px !important;
}
</style>