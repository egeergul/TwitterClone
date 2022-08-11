import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

//  3RD FIREBASE DATABASE
/**const firebaseConfig = {
  apiKey: "AIzaSyDYPl0yFJfwsDmpsCYIlOwk22rDXx6G3cM",
  authDomain: "twitter-3-654ca.firebaseapp.com",
  projectId: "twitter-3-654ca",
  storageBucket: "twitter-3-654ca.appspot.com",
  messagingSenderId: "874073479430",
  appId: "1:874073479430:web:64ccfc30c7f025c4872687",
  measurementId: "G-EYS264TYQ9",
}; */

// 4th Firebase database
const firebaseConfig = {
  apiKey: "AIzaSyC3IFRTOvPspBfpkZmyynUEj_N-8KUq3W0",
  authDomain: "twitter-clone-4-ef9bd.firebaseapp.com",
  projectId: "twitter-clone-4-ef9bd",
  storageBucket: "twitter-clone-4-ef9bd.appspot.com",
  messagingSenderId: "105395092435",
  appId: "1:105395092435:web:e0c1d85e459053ad3e0d26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Paths for Storage
const PROFILE_PICTURES = "profile-pictures/";
const HEADER_PICTURES = "header-pictures/";
const TWEET_MEDIA = "tweet-media/";

// Paths for realtime database
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
