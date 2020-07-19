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
        loading: true
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
          state.loading = false;
        }
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
          console.log(commit, database);
          // watching for database by using docchanges 
          try {
            // let ref = database.collection("messages").orderBy("timestamp");
            // ref.onSnapshot(snapShot => {
            //   snapShot.docChanges().forEach(change => {
            //     if (change.type === "added") {
            //       let doc = change.doc;
            //       commit("fetchListMessage", {
            //         id: doc.id,
            //         name: doc.data().name,
            //         content: doc.data().content,
            //         timestamp: doc.data().timestamp
            //       });
            //     }
            //   });
            // });
          } catch (e) {
            console.log(e);
          }
        }
      }
    },
    // smoothie
    smoothies: {
      namespaced: true,
      state: () => ({
        feedback: null,
        smoothies: [],
        loading: true
      }),
      mutations: {
        FETCH_SMOOTHIES_SUCCESS: (state, payload) => {
          state.smoothies = [...payload];
          state.loading = false;
        },
        FETCH_SMOOTHIES_FAIL: (state, payload) => {
          state.feedBack = payload;
        }
      },
      actions: {
        fetchSmoothies: ({
          commit
        }) => {

          // get collections

          database.collection("smoothies")
            .get()
            .then(snapShot => {
              const smoothies = snapShot.docs.map(doc => {
                return {
                  id: doc.id,
                  ...doc.data()
                }


              });
              commit("FETCH_SMOOTHIES_SUCCESS", smoothies);
            }).catch(e => {
              commit("FETCH_SMOOTHIES_FAIL", e.message);
            });
        }
      },

    }

  }
});