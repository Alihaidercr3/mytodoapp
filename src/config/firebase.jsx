// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCzXTdLBpDW3nnl4Mx81Cqf6QriTTeWvYQ",
  authDomain: "react-todo-codev.firebaseapp.com",
  projectId: "react-todo-codev",
  storageBucket: "react-todo-codev.firebasestorage.app",
  messagingSenderId: "729113419992",
  appId: "1:729113419992:web:40eccbd3ea1e1dd030f7ad",
  measurementId: "G-LXDW5CHVSH"
};
// 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)
const  storage = getStorage(app)
const analytics = getAnalytics(app);
export { firestore, analytics ,auth ,storage };