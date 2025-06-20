
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAi0bkc5YPYDEoyDj7xf2g9GDENszRlA-U",
  authDomain: "madi7idevpro.firebaseapp.com",
  databaseURL: "https://madi7idevpro-default-rtdb.firebaseio.com",
  projectId: "madi7idevpro",
  storageBucket: "madi7idevpro.firebasestorage.app",
  messagingSenderId: "992509576375",
  appId: "1:992509576375:web:614fbd1c8910f1201bf932",
  measurementId: "G-L8B8EFZRHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
