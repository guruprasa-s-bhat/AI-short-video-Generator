// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-77ca8.firebaseapp.com",
  projectId: "ai-short-video-generator-77ca8",
  storageBucket: "ai-short-video-generator-77ca8.firebasestorage.app",
  messagingSenderId: "957483610182",
  appId: "1:957483610182:web:2d4f70b19c6cb07fbcda47",
  measurementId: "G-YTXVHG3QDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);