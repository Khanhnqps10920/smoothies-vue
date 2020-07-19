<template>
  <div class="smoothies container">
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
    <div class="row" v-else>
      <div class="col s4" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card">
          <div class="card-content">
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
            <h2 class="indigo-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ingredient,index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ingredient }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab purple darken-1">
            <router-link :to="{
                name: 'editSmoothie'
              }">
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  // data
  data() {
    return {};
  },
  // computed
  computed: {
    ...mapState("smoothies", ["feedback", "smoothies", "loading"])
  },
  // methods
  methods: {
    ...mapActions("smoothies", ["fetchSmoothies"])
  },
  // created
  created() {
    this.fetchSmoothies();
  }
};
</script>

<style>
.smoothies {
  margin-top: 60px;
}

.smoothies h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}

.smoothies .ingredients {
  margin: 30px auto;
}

.smoothies .ingredients li {
  display: inline-block;
}

.smoothies i.delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
}

.smoothies .preloader-wrapper {
  margin: 100px auto;
  display: flex;
  justify-content: center;
}

.smoothies .spinner-layer {
  border-color: #9c27b0;
}

.smoothies .card {
  min-height: 250px;
}
</style>
