import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5XQbLoTuET0dUzTsXfvdaEQLkQZY2dQY",
  authDomain: "basic-authentication-4178f.firebaseapp.com",
  projectId: "basic-authentication-4178f",
  storageBucket: "basic-authentication-4178f.appspot.com",
  messagingSenderId: "86018648760",
  appId: "1:86018648760:web:0cafd0ebcb388ac360a24d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
