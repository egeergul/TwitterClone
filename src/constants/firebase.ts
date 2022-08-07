// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**const firebaseConfig = {
  apiKey: "AIzaSyCQACSSYLBSrKdJphh_jhJyo8CaWcLMPBQ",
  authDomain: "twitter-clone-cbe40.firebaseapp.com",
  projectId: "twitter-clone-cbe40",
  storageBucket: "twitter-clone-cbe40.appspot.com",
  messagingSenderId: "23650807100",
  appId: "1:23650807100:web:10929a0c259487748dc239",
  measurementId: "G-ML86ZLV4F0",
  databaseURL:
    "https://twitter-clone-cbe40-default-rtdb.europe-west1.firebasedatabase.app/",
}; */

const firebaseConfig = {
  apiKey: "AIzaSyC4w5D9wSc8BMXObtX7m3it4ajPCQqaD40",
  authDomain: "twitter-clone-2-5ee1c.firebaseapp.com",
  projectId: "twitter-clone-2-5ee1c",
  storageBucket: "twitter-clone-2-5ee1c.appspot.com",
  messagingSenderId: "642800972039",
  appId: "1:642800972039:web:b644d497b77becc252d5a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// PATHS FOR STORAGE
const PROFILE_PICTURES = "profile-pictures/";
const HEADER_PICTURES = "header-pictures/";
const TWEET_MEDIA = "tweet-media/";

// RPATHS FOR REALTIME DATABASE
const USERS = "users/";
const FOLLOWERS = "follows/followers/";
const FOLLOWINGS = "follows/followings/";
const TWEETS = "tweets/";

export {
  auth,
  database,
  storage,
  PROFILE_PICTURES,
  USERS,
  HEADER_PICTURES,
  FOLLOWERS,
  FOLLOWINGS,
  TWEETS,
  TWEET_MEDIA,
};
