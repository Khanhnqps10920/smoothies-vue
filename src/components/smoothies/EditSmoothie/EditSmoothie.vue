<template>
  <div class="edit-smoothie">
    <div class="preloader-wrapper big active" v-if="loading">
      <div class="spinner-layer">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>

    <transition name="fade" appear>
      <div v-if="!loading" class="add-smoothie container">
        <h2 class="center-align purple-text darken-1">Edit New Smoothie Recipe</h2>
        <form @submit.prevent="handleEditSmoothie" class="form">
          <div class="field title">
            <label for="title">Smoothie Title</label>
            <input type="text" name="title" v-model="smoothie.title" />
          </div>
          <div
            class="field add-ingredient"
            v-for="(ingredient,index) in smoothie.ingredients"
            :key="index"
          >
            <label for="ingredient">Ingredient</label>
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
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

            <button type="submit" class="btn purple darken-1">Update Smoothie</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import database from "../../../firebase/init";
import slugify from "slugify";

export default {
  data() {
    return {
      loading: true,
      smoothie: null,
      ingredient: null,
      feedback: null
    };
  },
  methods: {
    deleteIng(indexIng) {
      console.log(indexIng);
    },

    addIngredient() {
      if (this.ingredient) {
        this.feedback = null;
        this.smoothie.ingredients.push(this.ingredient);

        this.ingredient = null;
      } else {
        this.feedback = "You need to enter an ingredient";
      }
    },

    handleEditSmoothie() {
      if (!this.smoothie.title) {
        this.feedback = "You must enter a moothie title";

        return;
      }

      this.feedback = null;

      const ref = database.collection("smoothies").doc(this.smoothie.id);

      const newSlug = slugify(this.smoothie.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      });

      ref
        .update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: newSlug
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    const slug = this.$route.params.slug;

    const ref = database.collection("smoothies");

    ref
      .where("slug", "==", slug)
      .get()
      .then(snapShot => {
        snapShot.forEach(
          doc => (this.smoothie = { id: doc.id, ...doc.data() })
        );

        this.loading = false;
      })
      .catch(e => console.log(e));
  }
};
</script>

<style>
</style>