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
    <transition-group name="staggered-fade" tag="div" v-if="!loading" class="row" appear>
      <div class="col s4" v-for="smoothie in smoothiesByPage" :key="smoothie.id">
        <div class="card">
          <div class="card-content">
            <a @click="handleAuthorClick(smoothie)" class="delete">{{ smoothie.author }}</a>
            <h2 class="indigo-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ingredient }}</span>
              </li>
            </ul>
          </div>
          <span
            @click="handleWishLishAdd(smoothie)"
            class="btn-floating wishlish-btn btn-large halfway-fab purple darken-1"
          >
            <i class="material-icons edit">favorite_border</i>
          </span>
        </div>
      </div>
    </transition-group>
    <div class="paginate" v-if="!loading">
      <span>
        {{ currentPage }}
        <ul>
          <li v-for="page in smoothiesTotal" :key="page" @click="currentPage = page">{{ page }}</li>
        </ul>
      </span>
    </div>

    <div v-if="modalActive" class="modal">
      <div class="modal-content center">
        <i class="material-icons">error</i>
        <p>
          <span class="red-text">{{ feedbackModal }}</span>
        </p>
      </div>
      <div class="modal-footer">
        <a @click="modalActive = false" class="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
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
      limit: 6,
      modalActive: false,
      feedbackModal: null
    };
  },
  // computed
  computed: {
    ...mapState("smoothies", ["feedback", "smoothies", "loading"]),
    ...mapState("auth", ["user"]),

    smoothiesTotal() {
      return this.smoothies ? Math.ceil(this.smoothies.length / this.limit) : 0;
    },

    smoothiesByPage() {
      return [...this.smoothies].slice(
        (this.currentPage - 1) * this.limit,
        this.currentPage * this.limit
      );
    }
  },
  // methods
  methods: {
    ...mapActions("smoothies", ["fetchSmoothies"]),

    // DELETE SMOOTHIE
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
    },

    // HANDLE AUTHOR
    handleAuthorClick(smoothie) {
      if (!this.user) {
        this.$router.push({
          name: "otherProfile",
          params: { userId: smoothie.user_id }
        });
      } else {
        if (this.user.user_id === smoothie.user_id) {
          this.$router.push({ name: "profile" });
        } else {
          this.$router.push({
            name: "otherProfile",
            params: { userId: smoothie.user_id }
          });
        }
      }
    },
    // HANDLE ADD SMOOTHIE TO WISHLISH
    handleWishLishAdd(smoothie) {
      if (this.user) {
        const smoothieIndex = this.user.wishLish.findIndex(
          item => item.id === smoothie.id
        );

        // check if smoothie exist
        if (smoothieIndex === -1) {
          this.feedbackModal = null;
          this.user.wishLish.push(smoothie);

          database
            .collection("users")
            .doc(this.user.id)
            .update({
              wishLish: this.user.wishLish
            })
            .then(() => {
              window.alert("add wishlish success");
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          this.feedbackModal = "This smoothie is already in your wishlish";
          this.modalActive = true;
        }
      } else {
        this.feedbackModal = "You need to login first";
        this.modalActive = true;
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

.staggered-fade-enter-active {
  transition: all 1s ease;
  transform: translateY(0);
}
.staggered-fade-enter,
.staggered-fade-leave {
  transform: translateY(200px);
}
</style>
