import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeHQ15nPHK9BMQpQpIweKpR0b3endKBBo",
  authDomain: "annuaire-sunkdo.firebaseapp.com",
  projectId: "annuaire-sunkdo",
  storageBucket: "annuaire-sunkdo.appspot.com", // 🔹 Correction du storageBucket
  messagingSenderId: "998054098625",
  appId: "1:998054098625:web:dde01499c78b0b67494640",
  measurementId: "G-56XMN6K7PD"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // 🔹 Base de données Firestore
const storage = getStorage(app);  // 🔹 Stockage Firebase

export { app, analytics, db, storage };

