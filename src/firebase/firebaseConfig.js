import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXzkmKB0etPNOG7FzazisEF8oD5CS3hSo",
  authDomain: "comfy-store-af4be.firebaseapp.com",
  projectId: "comfy-store-af4be",
  storageBucket: "comfy-store-af4be.appspot.com",
  messagingSenderId: "89881638694",
  appId: "1:89881638694:web:7d262736afa6cb5a5333e7",
  measurementId: "G-X03EBCBK7V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();

export const signUpLoginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  signOut(auth)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
