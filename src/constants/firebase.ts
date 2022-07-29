// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQACSSYLBSrKdJphh_jhJyo8CaWcLMPBQ",
  authDomain: "twitter-clone-cbe40.firebaseapp.com",
  projectId: "twitter-clone-cbe40",
  storageBucket: "twitter-clone-cbe40.appspot.com",
  messagingSenderId: "23650807100",
  appId: "1:23650807100:web:10929a0c259487748dc239",
  measurementId: "G-ML86ZLV4F0",
  databaseURL:
    "https://twitter-clone-cbe40-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
