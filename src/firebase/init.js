import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB7Gzu-LFR_KrB8SWdR2QkhlTGVUT89gfA",
  authDomain: "ninja-smoothie-76a5a.firebaseapp.com",
  databaseURL: "https://ninja-smoothie-76a5a.firebaseio.com",
  projectId: "ninja-smoothie-76a5a",
  storageBucket: "ninja-smoothie-76a5a.appspot.com",
  messagingSenderId: "985367659827",
  appId: "1:985367659827:web:221e886a6d6a258751ea46",
  measurementId: "G-J3WPS3DPYH"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();