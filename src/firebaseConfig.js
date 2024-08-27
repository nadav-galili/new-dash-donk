import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4VG1ZI4rIQX8tngEhB4jaFqTXgPjnb9c",
    authDomain: "pokerdonkey-2ba74.firebaseapp.com",
    projectId: "pokerdonkey-2ba74",
    storageBucket: "pokerdonkey-2ba74.appspot.com",
    messagingSenderId: "959357331447",
    appId: "1:959357331447:web:b43b7c1f82149c8f9ab0f2",
    measurementId: "G-JNNLF89KPJ",
};
console.log("Firebase Config:", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
