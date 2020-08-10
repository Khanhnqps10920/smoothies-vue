<template>
  <div class="user-profile container">
    <div v-if="loading" class="progress purple accent-1">
      <div class="indeterminate purple"></div>
    </div>
    <transition name="user" appear>
      <div v-if="!loading" class="card">
        <h2 class="deep-purple-text center">{{ user ? user.alias : 'User' }}'s Wall</h2>
      </div>
    </transition>

    <div class="row">
      <div class="col s8">
        <div class="row">
          <div
            v-anime="{
          scale: [{ value: 0.8, duration: 0 }, { value: 1, duration: 300 }],
          opacity: [{ value: 0, duration: 0 }, { value: 1, duration: 250 }],
          translateX: [{ value: 170, duration: 0 }, { value: 0, duration: 1000 }],
          delay: 200 * index,
          easing: 'linear'
        }"
            class="col s6"
            v-for="(smoothie, index) in smoothies"
            :key="smoothie.id"
          >
            <div class="card smoothie-card">
              <div class="card-content">
                <h2 class="indigo-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                  <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                    <span class="chip">{{ ingredient }}</span>
                  </li>
                </ul>
              </div>
              <span class="btn-floating wishlish-btn btn-large halfway-fab purple darken-1">
                <router-link
                  :to="{
                name: 'editSmoothie',
                params: {
                  slug: smoothie.slug
                }
              }"
                >
                  <i class="material-icons edit">favorite_border</i>
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <transition name="user">
        <div class="col s4" v-if="!loading">
          <p class="user-wishlish">User's Wishlish</p>
          <Accordion v-for="(item,index) in user.wishLish" :key="index" :item="item"></Accordion>
        </div>
      </transition>
    </div>

    <transition name="user" appear>
      <Comment :userProp="user" v-if="!loading"></Comment>
    </transition>
  </div>
</template>

<script>
import database from "../../firebase/init";
import Comment from "../comment/Comment";
import Accordion from "../accordion/Accordion.vue";

export default {
  components: {
    Comment,
    Accordion
  },
  data() {
    return {
      loading: true,
      smoothies: [],
      user: null,
      modalActive: false
    };
  },

  methods: {},

  created() {
    const ref = database
      .collection("users")
      .where("user_id", "==", this.$route.params.userId);

    ref
      .get()
      .then(snapShot => {
        snapShot.forEach(doc => {
          this.user = {
            id: doc.id,
            ...doc.data()
          };
        });

        database
          .collection("smoothies")
          .where("user_id", "==", this.$route.params.userId)
          .get()
          .then(snapShot => {
            snapShot.forEach(doc => {
              this.smoothies.push({ id: doc.id, ...doc.data() });
            });

            this.loading = false;
          });
      })
      .catch(e => console.log(e));

    console.log(this.user);
  }
};
</script>

<style>
.modal-enter-active {
  animation: popping 0.5s;
}
.modal-leave-active {
  animation: popping 0.5s reverse;
}

.user-profile .card.smoothie-card {
  min-height: 330px;
}

.user-wishlish {
  margin: 10px;
  font-size: 18px;
  color: #8e24aa;
  letter-spacing: 0.3rem;
  border-bottom: 0.1px solid #8e24aa;
}

@keyframes popping {
  0% {
    transform: scale(0) translateY(-160px);
  }

  50% {
    transform: scale(1.2) translateY(20px);
  }

  100% {
    transform: scale(1) translateY(0);
  }
}
</style>