// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIHESPGiwTkBJL6ryEVFOApr50QtZDpZg",
  authDomain: "sanskar-academy-802d1.firebaseapp.com",
  projectId: "sanskar-academy-802d1",
  storageBucket: "sanskar-academy-802d1.firebasestorage.app",
  messagingSenderId: "815765306491",
  appId: "1:815765306491:web:554b93fd32ea1db2a176de",
  measurementId: "G-12KKET8KYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);