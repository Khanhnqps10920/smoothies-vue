<template>
  <div class="comment">
    <ul class="comments collection">
      <li v-for="(comment,index) in commentByPage" :key="index">
        <div class="deep-purple-text">{{ comment.from }}</div>
        <div class="grey-text text-darken-2">{{ comment.content }}</div>
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <div class="field">
        <label for="comment">Add Comment</label>
        <input type="text" name="comment" v-model="newComment" />
        <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      </div>
    </form>

    <div class="paginate">
      <span>
        {{ currentPage }}
        <ul>
          <li v-for="page in totalComment" :key="page" @click="currentPage = page">{{ page }}</li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import database from "../../firebase/init";
import slugify from "slugify";
import { mapState } from "vuex";

export default {
  props: {
    userProp: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      newComment: null,
      feedback: null,
      comments: [],
      limit: 4,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    totalComment() {
      return Math.ceil(this.comments.length / this.limit);
    },
    commentByPage() {
      return this.comments.slice(
        (this.currentPage - 1) * this.limit,
        this.currentPage * this.limit
      );
    }
  },
  methods: {
    addComment() {
      if (this.newComment) {
        // check if user exist
        if (this.user) {
          const slug = slugify(this.user.alias, {
            replacement: "-",
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          });

          this.feedback = null;
          // check if userprop
          if (this.userProp) {
            database
              .collection("comment")
              .add({
                from: slug,
                to: this.userProp.id,
                time: Date.now(),
                content: this.newComment
              })
              .then(() => {
                console.log("add new comment");
                this.newComment = null;
              })
              .catch(e => console.log(e));
          } else {
            // slug

            // add comment with current user
            database
              .collection("comment")
              .add({
                from: slug,
                to: slug,
                time: Date.now(),
                content: this.newComment
              })
              .then(() => {
                console.log("add new comment");
                this.newComment = null;
              })
              .catch(e => console.log(e));
          }
        } else {
          this.feedback = "You must login to commnet";
        }
      } else {
        this.feedback = "you must enter a comment";
      }
    }
  },

  created() {
    // create slug
    const slug = slugify(this.user.alias, {
      replacement: "-",
      remove: /[$*_+~.()'"!\-:@]/g,
      lower: true
    });
    // get comment real time
    const ref = database
      .collection("comment")
      .where("to", "==", this.userProp ? this.userProp.id : slug);

    ref.onSnapshot(snapShot => {
      snapShot.docChanges().forEach(change => {
        // check change type
        if (change.type === "added") {
          const doc = change.doc;
          this.comments.push({
            id: doc.id,
            ...doc.data()
          });
        }
      });
    });
  }
};
</script>

<style>
.comment {
  margin: 40px 0;
}

.comments li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>