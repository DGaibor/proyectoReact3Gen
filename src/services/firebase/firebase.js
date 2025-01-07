// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ-ZpZhFStYdf0dymTcSEU5qogSnTFJ14",
    authDomain: "flat-3gen-project.firebaseapp.com",
    projectId: "flat-3gen-project",
    storageBucket: "flat-3gen-project.firebasestorage.app",
    messagingSenderId: "700531557711",
    appId: "1:700531557711:web:acbe0c1c66d07cb8fa313a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
