import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm9V5y5bO9IqNQ876qo9TlnTf6dRXV1Fo",
    authDomain: "poker-vite.firebaseapp.com",
    projectId: "poker-vite",
    storageBucket: "poker-vite.appspot.com",
    messagingSenderId: "483497893618",
    appId: "1:483497893618:web:7012ff1db06d18f67d3a6b",
    measurementId: "G-SR18FFKVEM",
};
// console.log("Firebase Config:", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
