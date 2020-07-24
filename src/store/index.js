import Vue from "vue";
import Vuex from "vuex";
import database from "../firebase/init";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // chat
    chat: {
      namespaced: true,
      // state
      state: () => ({
        name: null,
        feedBack: null,
        newMessage: null,
        listMessage: [],
        chatActive: false,
      }),
      // getters
      getters: {
        // getName: state => {
        //   return state.name;
        // }
      },
      // mutations
      mutations: {
        changeName: (state, payload) => {
          state.name = payload;
        },
        changeFeedBack: (state, payload) => {
          state.feedBack = payload;
        },
        changeMessage: (state, payload) => {
          state.newMessage = payload;
        },
        fetchListMessage: (state, payload) => {
          state.listMessage.push(payload);
        },
        setActive: (state) => {
          state.chatActive = !state.chatActive;
        },
      },
      // actions
      actions: {
        changeName: ({
          commit
        }, payload) => {
          commit("changeName", payload);
        },
        changeFeedBack: ({
          commit
        }, payload) => {
          commit("changeFeedBack", payload);
        },
        changeMessage: ({
          commit
        }, payload) => {
          commit("changeMessage", payload);
        },
        fetchListMessage: ({
          commit
        }) => {
          // watching for database by using docchanges
          try {

            const messages = database.collection("messages").orderBy("timestamp");
            messages.onSnapshot(snapShot => {
              snapShot.docChanges().forEach(change => {
                //check change type
                if (change.type === "added") {
                  const doc = change.doc;

                  // commit
                  commit("fetchListMessage", {
                    id: doc.id,
                    name: doc.data().name,
                    content: doc.data().content,
                    timestamp: doc.data().timestamp
                  })
                }
              })
            })
          } catch (e) {
            console.log(e);
          }
        },
        setActive: ({
          commit
        }) => {
          commit("setActive");
        },
      },
    },
    // smoothie
    smoothies: {
      namespaced: true,
      state: () => ({
        feedback: null,
        smoothies: [],
        loading: true,
      }),
      mutations: {
        FETCH_SMOOTHIES_SUCCESS: (state, payload) => {
          state.smoothies = [...payload];
          state.loading = false;
        },
        FETCH_SMOOTHIES_FAIL: (state, payload) => {
          state.feedBack = payload;
        },
      },
      actions: {
        fetchSmoothies: ({
          commit
        }) => {
          // get collections

          database
            .collection("smoothies")
            .get()
            .then((snapShot) => {
              const smoothies = snapShot.docs.map((doc) => {
                return {
                  id: doc.id,
                  ...doc.data(),
                };
              });
              commit("FETCH_SMOOTHIES_SUCCESS", smoothies);
            })
            .catch((e) => {
              commit("FETCH_SMOOTHIES_FAIL", e.message);
            });
        },
      },
    },
    // auth
    auth: {
      namespaced: true,
      state: () => ({
        user: null,
        feedback: null,
        isLogin: false,
      }),
      mutations: {
        SET_FEED_BACK: (state, message) => {
          state.feedback = message;
        },
        SET_USER: (state, user) => {
          state.user = user;
        },
        SET_LOGIN_IN: (state, login) => {
          state.isLogin = login;
        },
      },
      actions: {
        setFeedback: ({
          commit
        }, payload) => {
          commit("SET_FEED_BACK", payload);
        },
        setUser: ({
          commit
        }, payload) => {
          commit("SET_LOGIN_IN", payload !== null);
          if (payload) {
            commit("SET_USER", payload);
          } else {
            commit("SET_USER", null);
          }
        },
      },
    },
  },
});