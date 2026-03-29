// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKWotFzadxWpZseB7R83m9TgddHs0djlc",
  authDomain: "dailyexpense-9ebc0.firebaseapp.com",
  projectId: "dailyexpense-9ebc0",
  storageBucket: "dailyexpense-9ebc0.firebasestorage.app",
  messagingSenderId: "154462889288",
  appId: "1:154462889288:web:98ef1cb4010c0408e2bf7d",
  measurementId: "G-0GFD28K3DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const analytics = getAnalytics(app);
export const db = getFirestore(app);