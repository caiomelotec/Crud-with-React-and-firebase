import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAOLSZn_z-rEGDZFolffijROg4i73DRCf4",
  authDomain: "crud-dff59.firebaseapp.com",
  projectId: "crud-dff59",
  storageBucket: "crud-dff59.appspot.com",
  messagingSenderId: "76994791976",
  appId: "1:76994791976:web:6051d2c12d9f170910431d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);