import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB1M_I-6ZwcEuWVuDzYiVMK8-GZxQ_yuwk",
    authDomain: "user-form-703d2.firebaseapp.com",
    projectId: "user-form-703d2",
    storageBucket: "user-form-703d2.appspot.com",
    messagingSenderId: "765325748019",
    appId: "1:765325748019:web:462bab856629a33035c046"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc, ref, uploadBytes };
