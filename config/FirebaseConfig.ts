// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2wsrlw-Qnf-9PqDlVsV8PCBvRqmkoOZw",
  authDomain: "ai-pocket-agent-2d052.firebaseapp.com",
  projectId: "ai-pocket-agent-2d052",
  storageBucket: "ai-pocket-agent-2d052.firebasestorage.app",
  messagingSenderId: "134428343759",
  appId: "1:134428343759:web:e6566a787f0e68044c66ba",
  measurementId: "G-8VDGHV93ZH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);
