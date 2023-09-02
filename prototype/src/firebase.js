// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJDp8nZCV3A-T5IeC7_qG91k9jPEGrdFU",
  authDomain: "moviemania-ba604.firebaseapp.com",
  projectId: "moviemania-ba604",
  storageBucket: "moviemania-ba604.appspot.com",
  messagingSenderId: "1092583119775",
  appId: "1:1092583119775:web:735e0a4beabdae4152bbaa",
  measurementId: "G-5M4YJ7877N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);