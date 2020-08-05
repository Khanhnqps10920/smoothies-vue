<template>
  <div class="add-smoothie container">
    <h2 class="center-align purple-text darken-1">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie" class="form">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-ingredient" v-for="(ingredient,index) in ingredients" :key="index">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete-form" @click="deleteIng(index)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="ingredient">Add An Ingredient</label>
        <input
          type="text"
          name="ingredient"
          v-model="ingredient"
          @keydown.tab.prevent="addIngredient"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>

        <button type="submit" class="btn purple darken-1">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import database from "../../../firebase/init";
import slugify from "slugify";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null,
      feedback: null
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    addSmoothie() {
      if (this.title && this.ingredients.length > 0) {
        const slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        database
          .collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            user_id: this.user.user_id,
            author: this.user.alias,
            slug
          })
          .then(() => {
            console.log("add smoothie success");
            this.$router.push({ name: "Home" });
          })
          .catch(e => console.log(e));
      } else {
        this.feedback = "You need to fullfill all input";
      }
    },
    addIngredient() {
      // check null
      if (this.ingredient) {
        // add new ingredient
        this.ingredients.push(this.ingredient);
        this.feedback = null;
        this.ingredient = null;
      } else {
        this.feedback = "You need enter the ingredient name";
      }
    },
    deleteIng(index) {
      this.ingredients.splice(index, 1);
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete-form {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
}
</style>