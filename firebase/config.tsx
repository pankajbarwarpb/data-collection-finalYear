// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZmsrsLYlYFshHbNLhRB1cu979F5UAaEk",
  authDomain: "data-collection-bcd1a.firebaseapp.com",
  projectId: "data-collection-bcd1a",
  storageBucket: "data-collection-bcd1a.appspot.com",
  messagingSenderId: "161460684115",
  appId: "1:161460684115:web:45ff2c0d01766edcb88da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, db, provider, storage };
