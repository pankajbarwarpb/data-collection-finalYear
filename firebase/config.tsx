// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBvdkLnbLBOSs-ICLs9gX7Uepx8D1mmYs",
  authDomain: "data-collection-bf8c7.firebaseapp.com",
  projectId: "data-collection-bf8c7",
  storageBucket: "data-collection-bf8c7.appspot.com",
  messagingSenderId: "9253432387",
  appId: "1:9253432387:web:d859245087a8bfb6dfb8f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, db, provider, storage };
