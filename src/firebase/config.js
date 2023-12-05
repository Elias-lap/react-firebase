// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIjTntUKUiorBP6kKO1JbH7T1Kr0zLBi8",
  authDomain: "courses-app-3fd81.firebaseapp.com",
  projectId: "courses-app-3fd81",
  storageBucket: "courses-app-3fd81.appspot.com",
  messagingSenderId: "115096603737",
  appId: "1:115096603737:web:c129388d3df73aa9d0f548"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);