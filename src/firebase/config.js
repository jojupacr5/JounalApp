// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUM5bP6jZdvspgXmMOuDcuesIMopX1-kQ",
  authDomain: "journalapp-c6f88.firebaseapp.com",
  projectId: "journalapp-c6f88",
  storageBucket: "journalapp-c6f88.appspot.com",
  messagingSenderId: "952913319450",
  appId: "1:952913319450:web:0457fb8b0dda5f31c463a3",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
