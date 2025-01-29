
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOOIf5tONQniAFssQQqTjrdNY-fC57w4k",
    authDomain: "madrocket-43846.firebaseapp.com",
    projectId: "madrocket-43846",
    storageBucket: "madrocket-43846.firebasestorage.app",
    messagingSenderId: "221468704081",
    appId: "1:221468704081:web:81f78726b9cc4fae75a770",
    measurementId: "G-0CSNDRZDG9"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
