import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-OhDIxk6VNpPjh38a0GAdK7JG5D67cZY",
  authDomain: "social-51311.firebaseapp.com",
  projectId: "social-51311",
  storageBucket: "social-51311.appspot.com",
  messagingSenderId: "1097715801255",
  appId: "1:1097715801255:web:f96c6512a698e393068f82",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();
// Initialize Firebase
// const app = initializeApp(firebaseConfig);


export  {
    storage, firebase as default
  }
