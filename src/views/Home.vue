<template>
  <div class="home">
    <Smoothies />
  </div>
</template>

<script>
import Smoothies from "../components/smoothies/Smoothies";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Smoothies
  }
};
</script>
