import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJDp8nZCV3A-T5IeC7_qG91k9jPEGrdFU",
  authDomain: "moviemania-ba604.firebaseapp.com",
  projectId: "moviemania-ba604",
  storageBucket: "moviemania-ba604.appspot.com",
  messagingSenderId: "1092583119775",
  appId: "1:1092583119775:web:735e0a4beabdae4152bbaa",
  measurementId: "G-5M4YJ7877N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export var userIsLoggedIn = false;

// if we're going to use callbacks we have to make sure the nested functions have them in their parameter list as well

export function createAccount(auth, username, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // account creation success; user is now logged in
    const user = userCredential.user;
    console.log("User account creation successful! The user is: ", user.email);
    // add user to Firestore database
    addNewUserToDatabase(db, user, username)
    alert("Success creating account in! Welcome, " + user.displayName);
    userIsLoggedIn = true;
  })
  .catch((error) => {
    // error signing in 
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error creating account: ", errorCode, errorMessage);
    alert("Error creating account. Please try again");
  });
}

export function logIntoExistingAccount(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("The user signed in successfully! The user is: ", user.email);
    alert("Welcome, " + user.displayName);
    userIsLoggedIn = true;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error signing into account. The error is: ", errorCode, errorMessage);
    alert("Error creating logging into account. Please try again");
  });
}

// firestore helper functions
async function addNewUserToDatabase(db, user, username) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      email: user.email
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export function logout() {
  signOut(auth).then(() => {
    alert("Sign out successful");
    userIsLoggedIn = false;
  }).catch((error) => {
    alert("Error signing out: ", error);
  });
}