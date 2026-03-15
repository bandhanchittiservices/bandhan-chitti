import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDq9F24MgwZzpKKwZoAqx0kWi5jjOtom2U",
  authDomain: "bandhan-chitti-48040.firebaseapp.com",
  projectId: "bandhan-chitti-48040",
  storageBucket: "bandhan-chitti-48040.firebasestorage.app",
  messagingSenderId: "219899499972",
  appId: "1:219899499972:web:5c13c9ea9f3dda90208091"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
