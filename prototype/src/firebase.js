import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const toastId = 'Log in Status';

// if we're going to use callbacks we have to make sure the nested functions have them in their parameter list as well

    // Login State Check
export function checkLoginState() {
      if (auth.currentUser != null) {
          // User is logged, awesome. do nothing
          console.log("The user is logged in");
          return true;
      } else {
          // No user is signed in. Deactivate buttons and alert that they need to login
          return false;
      }
  }

  /*
   createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = auth.currentUser;
      let id = String(user.uid);
      localStorage.setItem('email', email);
      
      let loginAnchor = document.querySelector(".login-name__anchor");
      loginAnchor.innerHTML = email;

      await setDoc(doc(db, "users", id), {
        email: email,
        wishlist: "false",
        backlog: "false"
      });

      */

export function createAccount(auth, username, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // account creation success; user is now logged in
    const user = userCredential.user;
    let id = String(user.uid);
    console.log("User account creation successful! The user is: ", user.email);
    // add user to Firestore database
    addNewUserToDatabase(db, user, username)
    toast.success("Success creating account!", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId,
      transition: Slide
    });
    userIsLoggedIn = true;
  })
  .catch((error) => {
    // error signing in 
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error creating account: ", errorCode, errorMessage);
    toast.error('Error creating account. Please try again.', {
      position: toast.POSITION.TOP_LEFT,
      toastId
    });
  });
}

export function logIntoExistingAccount(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("The user signed in successfully! The user is: ", user.email);
    toast.success("Success logging in!", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId,
      transition: Slide
    });
    userIsLoggedIn = true;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error signing into account. The error is: ", errorCode, errorMessage);
    toast.error('Error logging in. Please try again.', {
      position: toast.POSITION.TOP_LEFT,
      toastId
    });
  });
}

// firestore helper functions
async function addNewUserToDatabase(db, user, username) {
  try {
    await setDoc(doc(db, "users", String(user.uid)), {
      username: username,
      email: user.email,
      watchList: [],
      tagList: []
    });
    console.log("Document has been written")
    console.log("Document written with ID: ", user.uid);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export function logout() {
  signOut(auth).then(() => {
    toast.success("Sign out successful!", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId,
      transition: Slide
    });
    userIsLoggedIn = false;
  }).catch((error) => {
    toast.error('Error signing out.', {
      position: toast.POSITION.TOP_LEFT,
      toastId
    });
    console.log("Error signing out: ", error);
  });
}