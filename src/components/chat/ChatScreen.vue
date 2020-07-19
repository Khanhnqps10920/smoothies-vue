<template>
  <div class="card" v-if="chatActive">
    <div class="card-content">
      <ul class="messages">
        <li v-for="(message,i) in listMessage" :key="message.id + i">
          <span class="teal-text">{{ message.name }}:</span>
          <span class="grey-text text-darken-3">{{ message.content }}</span>
          <span class="grey-text time">{{ message.timestamp }}</span>
        </li>
      </ul>
    </div>
    <div class="card-action">
      <NewMessage></NewMessage>
    </div>
  </div>
</template>

<script>
// database
// import database from "../firebase/init";

import NewMessage from "./NewMessage.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    NewMessage
  },
  computed: {
    ...mapState("chat", ["listMessage", "loading", "chatActive"])
  },
  methods: {
    ...mapActions("chat", ["fetchListMessage"])
  },
  created() {
    // fetch data
    this.fetchListMessage();
  }
};
</script>

<style>
.chat span {
  font-size: 1.4em;
}

.chat .time {
  display: block;
  font-size: 1.2em;
}

.teal-text {
  margin-right: 0.5em;
}

.messages li {
  margin: 10px 0;
}

.chat .card {
  width: 300px;
  z-index: 100000;
  position: fixed;
  bottom: 0;
  right: 80px;
}

.chat .messages {
  height: 125px;
  max-height: 125px;
  overflow: auto;
}

.chat .messages::-webkit-scrollbar {
  width: 3px;
}
.chat .messages::-webkit-scrollbar-track {
  width: 3px;
}
.chat .messages::-webkit-scrollbar-thumb {
  width: 3px;
}
</style>