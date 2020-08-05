<template>
  <div class="comment">
    <ul class="comments collection">
      <li>
        <div class="deep-purple-text"></div>
        <div class="grey-text text-darken-2"></div>
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <div class="field">
        <label for="comment">Add Comment</label>
        <input type="text" name="comment" v-model="newComment" />
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      newComment: null,
      feedback: null
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    addComment() {
      console.log(this.user.alias);
    }
  }
};
</script>

<style>
.comment {
  margin-top: 40px;
}

.comments li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>