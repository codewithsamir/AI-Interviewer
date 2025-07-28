import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3dT4YAHfkF-JXVkkVsVnkoVTTH4vNEeg",
  authDomain: "aiinterview-fdd2c.firebaseapp.com",
  projectId: "aiinterview-fdd2c",
  storageBucket: "aiinterview-fdd2c.firebasestorage.app",
  messagingSenderId: "1036490077402",
  appId: "1:1036490077402:web:7a2e42851902626e86e1e3",
  measurementId: "G-5YKXTDG0VC"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);