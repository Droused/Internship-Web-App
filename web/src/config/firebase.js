import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaf6PpSkkXAfCfCKAFShvrLJnUL0lsCl0",
  authDomain: "internshipsforyou-85401.firebaseapp.com",
  projectId: "internshipsforyou-85401",
  storageBucket: "internshipsforyou-85401.appspot.com",
  messagingSenderId: "183363727253",
  appId: "1:183363727253:web:ef6077f0d18fce12e1509c",
  measurementId: "G-CE9BDG501E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);
const storage = getStorage(app);

export { db };
