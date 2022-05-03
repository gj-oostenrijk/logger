// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCl6anKfo5vGbJSYVns59m1TRjrWkSOH6U",
    authDomain: "logger-8a660.firebaseapp.com",
    databaseURL: "https://logger-8a660-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "logger-8a660",
    storageBucket: "logger-8a660.appspot.com",
    messagingSenderId: "36198865763",
    appId: "1:36198865763:web:5730b9dfb639d1fa961156"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

