// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC1cs_lM5f9NjgBvOC9XSYvf_5D0Yf0HE",
  authDomain: "rtss-f703a.firebaseapp.com",
  projectId: "rtss-f703a",
  storageBucket: "rtss-f703a.appspot.com",
  messagingSenderId: "1017934405353",
  appId: "1:1017934405353:web:b83e1d37d193956b7d5a78",
  measurementId: "G-SRJVRCT4X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db,analytics };
