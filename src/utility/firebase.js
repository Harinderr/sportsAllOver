// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.BLOG_API,
  authDomain: "blog-web-7b01b.firebaseapp.com",
  projectId: "blog-web-7b01b",
  storageBucket: "blog-web-7b01b.appspot.com",
  messagingSenderId: "815794795606",
  appId: "1:815794795606:web:f1ed0fe5b3f22bac7a77f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);