import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { APIResponse } from "@/types";
import { getApps, initializeApp } from "firebase/app";

let firebaseConfig;

const app = getApps().find((it) => it.name === "firebase-client-app") ||
  initializeApp(
    {
      apiKey: "AIzaSyBvIzOhe_imZAQtXWq3UVolFp8QoCjXXvA",
      authDomain: "web-spiqyp.firebaseapp.com",
      projectId: "web-spiqyp",
      storageBucket: "web-spiqyp.appspot.com",
      messagingSenderId: "849474439575",
      appId: "1:849474439575:web:1711e28672ca9395359cd2",
      measurementId: "G-NXP3G5RXY8"
    },
    "firebase-client-app"
  );
const auth = getAuth(app);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    
  const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}