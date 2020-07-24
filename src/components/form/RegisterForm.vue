<template>
  <div class="register form">
    <form @submit.prevent="handleRegister" class="card-panel">
      <h2 class="center purple-text draken-1">Register</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn purple darken-1">register</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions } from "vuex";
import slugify from "slugify";
import database from "../../firebase/init";

export default {
  data() {
    return {
      email: null,
      password: null,
      alias: null
    };
  },
  computed: {
    ...mapState("auth", ["feedback"])
  },
  methods: {
    ...mapActions("auth", ["setFeedback"]),
    handleRegister() {
      if (this.email && this.password && this.alias) {
        const slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        const ref = database.collection("users").doc(slug);
        ref.get().then(doc => {
          // check if alias exist
          if (doc.exists) {
            this.setFeedback("This alias is already created");
          } else {
            this.setFeedback(null);

            // create new user
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                // set user in database
                ref
                  .set({
                    alias: this.alias,
                    geoLocation: null,
                    user_id: cred.user.uid
                  })
                  .then(() => {
                    this.$router.push({ name: "Home" });
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => this.setFeedback(e.message));
          }
        });
      } else {
        this.setFeedback("you must fullfill all input");
        console.log(this.feedback);
      }
    }
  }
};
</script>

<style>
</style>