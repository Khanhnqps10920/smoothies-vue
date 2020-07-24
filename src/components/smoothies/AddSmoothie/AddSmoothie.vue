<template>
  <div class="add-smoothie container">
    <h2 class="center-align purple-text darken-1">Add New Smoothie Recipe</h2>
    <form class="form">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-ingredient">
        <label for="ingredient">Add An Ingredient</label>
        <input type="text" name="ingredient" />
      </div>
      <div class="field center-align">
        <button class="btn purple darken-1">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null
    };
  }
};
</script>

<style>
</style>