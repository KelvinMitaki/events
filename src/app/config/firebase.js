import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC06RXzRX1bqqrPSXV-8uo-BF752ZQ14eA",
  authDomain: "events-90674.firebaseapp.com",
  databaseURL: "https://events-90674.firebaseio.com",
  projectId: "events-90674",
  storageBucket: "events-90674.appspot.com",
  messagingSenderId: "899655810996",
  appId: "1:899655810996:web:b51a1c8ce7d4313c567ce1",
  measurementId: "G-P3RW4YEWPY",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
