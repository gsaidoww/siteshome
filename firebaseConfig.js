// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAziO9etkPH9xy33CgCqeMO9pRzY9kBLOY",
    authDomain: "homegeom-4e480.firebaseapp.com",
    projectId: "homegeom-4e480",
    storageBucket: "homegeom-4e480.appspot.com",
    messagingSenderId: "325418705410",
    appId: "1:325418705410:web:b0e3ab7549fcbadfe1fd1b"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);