
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCEOG4PR49OovV5OlSYy0auO50_pqAPaWs",
  authDomain: "codelive-27ae5.firebaseapp.com",
  projectId: "codelive-27ae5",
  storageBucket: "codelive-27ae5.firebasestorage.app",
  messagingSenderId: "21754381998",
  appId: "1:21754381998:web:657c204fc7e27e07680f3f",
  measurementId: "G-8F2PE9521K",
  databaseURL: "https://codelive-27ae5-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
