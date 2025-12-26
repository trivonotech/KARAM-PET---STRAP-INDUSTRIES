import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpVizI77laUaSrXPok9TDxFCW4fAek_Mc",
    authDomain: "karam-pet---strap-industries.firebaseapp.com",
    projectId: "karam-pet---strap-industries",
    storageBucket: "karam-pet---strap-industries.firebasestorage.app",
    messagingSenderId: "558174137170",
    appId: "1:558174137170:web:31ed7168202587db70288b",
    measurementId: "G-MXGEV9MHQS"
};

import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Analytics (only on client side)
let analytics;
if (typeof window !== 'undefined') {
    isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, db, auth, storage, googleProvider, analytics };
