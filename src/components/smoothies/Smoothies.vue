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
            <a href="#" class="delete">{{ smoothie.author }}</a>
            <h2 class="indigo-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ingredient,index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ingredient }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating wishlish-btn btn-large halfway-fab purple darken-1">
            <router-link :to="{
                name: 'editSmoothie'
            }">
              <i class="material-icons edit">favorite_border</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="paginate" v-if="!loading">
      <span>
        1
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import database from "../../firebase/init";

export default {
  // data
  data() {
    return {
      currentPage: 1,
      limit: 6
    };
  },
  // computed
  computed: {
    ...mapState("smoothies", ["feedback", "smoothies", "loading"]),
    smoothiesTotal() {
      return this.smoothies ? this.smoothies.length : 0;
    }
  },
  // methods
  methods: {
    ...mapActions("smoothies", ["fetchSmoothies"]),
    deleteSmoothie(smoothieId) {
      const ref = database.collection("smoothies").doc(smoothieId);
      if (ref) {
        ref
          .delete()
          .then(() => {
            this.fetchSmoothies();
            console.log("document deleted");
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
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
  margin-top: 20px;
}

.smoothies .ingredients {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}

.smoothies .ingredients li {
  display: inline-block;
}

.smoothies .delete {
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  color: #aaa;
  text-transform: capitalize;
}

.smoothies .preloader-wrapper {
  margin: 100px auto;
  display: flex;
  justify-content: center;
}

.smoothies .spinner-layer {
  border-color: #9c27b0;
}

.smoothies .wishlish-btn {
  bottom: -15px !important;
}

.smoothies .card {
  min-height: 300px;
}

.paginate {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: relative;
}

.paginate span {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #9c27b0;
  cursor: pointer;
}

.paginate ul {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  border: 0.1px solid black;
  top: 15px;
  transition: 0.4s ease;
}

.paginate ul li {
  width: 29px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1px solid black;
  color: black;
  transition: 0.4s ease;
}

.paginate ul li:hover {
  background: #9c27b0;
  color: white;
}

.paginate ul li:last-child {
  border: none;
}

.paginate span:hover ul {
  visibility: visible;
  opacity: 1;
}
</style>
