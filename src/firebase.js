import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAoOvmweuOp8BHmtGetlYGjzWCVId0wAEQ",
    authDomain: "myportfolio-490d1.firebaseapp.com",
    projectId: "myportfolio-490d1",
    storageBucket: "myportfolio-490d1.appspot.com",
    messagingSenderId: "701315764803",
    appId: "1:701315764803:web:5b5803d6a44257c528baf6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
