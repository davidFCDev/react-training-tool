// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3V64gAVQMgdhEFgj7J6Ouu1OxLaOxCB0",
  authDomain: "react-training-a.firebaseapp.com",
  projectId: "react-training-a",
  storageBucket: "react-training-a.firebasestorage.app",
  messagingSenderId: "287073628109",
  appId: "1:287073628109:web:2312a53d8ea410c7205e84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
