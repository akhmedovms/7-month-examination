import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA37edOoaDAt-EjOyDKCNFlBmewjp_u4q4",
  authDomain: "unsplash-project-5423e.firebaseapp.com",
  projectId: "unsplash-project-5423e",
  storageBucket: "unsplash-project-5423e.appspot.com",
  messagingSenderId: "1086940830489",
  appId: "1:1086940830489:web:1819496d0ec6bd8c8bc388",
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
