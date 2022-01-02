import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBHolhUHjZTYfhOMvqy4Q-yZ1wtuAghcx4",
  authDomain: "nxt-8b4a5.firebaseapp.com",
  projectId: "nxt-8b4a5",
  storageBucket: "nxt-8b4a5.appspot.com",
  messagingSenderId: "391730790043",
  appId: "1:391730790043:web:a26662c36c06b6a6bed03e",
  measurementId: "G-K7V3W17242"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
