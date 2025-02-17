import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpzHW2l-lm0dpsQ0KKpDTiVnTN9GdroQ0",
  authDomain: "sunkdo.firebaseapp.com",
  projectId: "sunkdo",
  storageBucket: "sunkdo.firebasestorage.app",
  messagingSenderId: "158678088912",
  appId: "1:158678088912:web:245389f6d688e099fd32d5",
  measurementId: "G-3963MCCJPB"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // 🔹 Base de données Firestore
const storage = getStorage(app);  // 🔹 Stockage Firebase
const auth = getAuth(app)
export { app, analytics, db, storage , auth};

