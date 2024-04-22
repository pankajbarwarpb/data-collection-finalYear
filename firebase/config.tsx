// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe7DkEn-Ms15TmbO_YOlhDOiM6CLxACUM",
  authDomain: "data-collection-f53ae.firebaseapp.com",
  projectId: "data-collection-f53ae",
  storageBucket: "data-collection-f53ae.appspot.com",
  messagingSenderId: "398340725580",
  appId: "1:398340725580:web:6c721a87c7ae97c41bcde9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, db, provider, storage };
