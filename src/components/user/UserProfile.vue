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
      <div
        v-anime="{
          scale: [{ value: 0.8, duration: 0 }, { value: 1, duration: 300 }],
          opacity: [{ value: 0, duration: 0 }, { value: 1, duration: 250 }],
          translateX: [{ value: 170, duration: 0 }, { value: 0, duration: 1000 }],
          delay: 200 * index,
          easing: 'linear'
        }"
        class="col s4"
        v-for="(smoothie, index) in smoothies"
        :key="smoothie.id"
      >
        <div class="card">
          <div class="card-content">
            <a @click="handleDeleteSmoothy(smoothie)" class="delete waves-effect">
              <i class="material-icons">delete</i>
            </a>
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
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>

    <div v-if="modalActive" class="modal">
      <div class="modal-content center">
        <i class="material-icons">delete_forever</i>
        <p>
          Are u Want delete This
          <span class="red-text">{{ smoothieName }}</span>
        </p>
      </div>
      <div class="modal-footer">
        <a
          @click="modalActive = false"
          class="modal-close waves-effect waves-green btn-flat"
        >DisAgree</a>
        <a
          @click="agreeDeleteSmoothie"
          class="red-text darken-4 modal-close waves-effect waves-green btn-flat"
        >Agree</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import database from "../../firebase/init";
export default {
  data() {
    return {
      loading: true,
      smoothies: [],
      modalActive: false,
      smoothieName: null,
      smoothieDelete: null
    };
  },

  computed: {
    ...mapState("auth", ["user"])
  },

  methods: {
    handleDeleteSmoothy(smoothie) {
      this.modalActive = true;
      this.smoothieName = smoothie.title;
      this.smoothieDelete = smoothie;
    },

    agreeDeleteSmoothie() {
      console.log(this.smoothieDelete.id);
      const ref = database.collection("smoothies");

      // handle delete
      ref
        .doc(this.smoothieDelete.id)
        .delete()
        .then(() => {
          // reset data
          this.smoothieDelete = null;
          this.modalActive = false;
          this.smoothieName = null;
          this.smoothies = [];

          // re fetch smoothies

          ref
            .where("user_id", "==", this.user.user_id)
            .get()
            .then(snapShot => {
              snapShot.forEach(doc => {
                this.smoothies.push({ ...doc.data(), id: doc.id });
              });

              this.loading = false;
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  },

  created() {
    // fetch smoothies
    try {
      setTimeout(() => {
        const ref = database
          .collection("smoothies")
          .where("user_id", "==", this.user.user_id);

        ref.get().then(snapShot => {
          snapShot.forEach(doc => {
            console.log(doc.id);
            this.smoothies.push({ ...doc.data(), id: doc.id });
          });

          this.loading = false;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style>
.user-profile {
  margin-top: 65px;
}

.progress {
  margin-top: 20px;
}

.col h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 20px;
}

.ingredients {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}

.ingredients li {
  display: inline-block;
}

.delete {
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  color: #aaa;
  text-transform: capitalize;
}

.delete:hover {
  color: #a1a1a1;
}

.preloader-wrapper {
  margin: 100px auto;
  display: flex;
  justify-content: center;
}

.spinner-layer {
  border-color: #9c27b0;
}

.wishlish-btn {
  bottom: -15px !important;
}

.col .card {
  min-height: 300px;
}

.user-enter-active,
.user-leave-active {
  transition: 1s ease;
  transform: scale(1);
}

.user-enter,
.user-leave-to {
  transform: scale(0);
}

.modal {
  top: 10%;
  z-index: 2000000000000;
  display: block;
  width: 40%;
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content i {
  font-size: 40px;
  margin-right: 8px;
}
</style>