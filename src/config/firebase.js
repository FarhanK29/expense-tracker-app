// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgXsVNsg3jd_Dcko82AaSPddGUXxVIgkM",
  authDomain: "budget-app-2f5a6.firebaseapp.com",
  projectId: "budget-app-2f5a6",
  storageBucket: "budget-app-2f5a6.appspot.com",
  messagingSenderId: "156265585058",
  appId: "1:156265585058:web:d6ce5a7bb07f32be413afb",
  measurementId: "G-JQ8MH03K50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app;
export const db = getFirestore(app);