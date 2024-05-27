// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOyNGGXME410WWVj5Lz_FIUiS4qFMNxGI",
  authDomain: "in-house-84779.firebaseapp.com",
  projectId: "in-house-84779",
  storageBucket: "in-house-84779.appspot.com",
  messagingSenderId: "1045527774531",
  appId: "1:1045527774531:web:195d7f319c0cc405cfdbf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, db, provider, storage };
