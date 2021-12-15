// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQz4Tpoc33gnfeXFYvWrFu7-T6IRhwBDk",
  authDomain: "notas-react-f1c65.firebaseapp.com",
  projectId: "notas-react-f1c65",
  storageBucket: "notas-react-f1c65.appspot.com",
  messagingSenderId: "262052559434",
  appId: "1:262052559434:web:6ff2c002057942c51944b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {
    app,
    db,
    collection,
    getDocs
}
