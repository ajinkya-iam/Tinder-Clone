import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA1goJqQdeQkCgUTptHQINfK-7XKhGILtg",
  authDomain: "tinder-45400.firebaseapp.com",
  projectId: "tinder-45400",
  storageBucket: "tinder-45400.appspot.com",
  messagingSenderId: "558902605128",
  appId: "1:558902605128:web:8a25612580c4cfbfaf2f7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =  getAuth()
const db =  getFirestore()

export {auth,db}