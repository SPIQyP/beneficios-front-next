import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { APIResponse } from "@/types";
import { getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { use } from "react";

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
const db = getFirestore(app)

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    await createUser(userCreds)
    const idToken = await userCreds.user.getIdToken();
    return createSession(idToken);
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

export async function signUpWithEmail(email:string, password:string) {
  try{
    const userCreds = await createUserWithEmailAndPassword(auth, email, password)
    await createUser(userCreds)
    if (!userCreds.user.emailVerified){
      sendEmailVerification(userCreds.user);
      return true;
    }

    return false;

  }catch(error) {
    throw error;
  }
  
}

export async function signInWithEmail(email:string,password:string){
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)

    if (!userCreds.user.emailVerified){
      return false
    }else{
      const idToken = await userCreds.user.getIdToken();
      return await createSession(idToken);
    }

    
  }catch(error){
    throw error;
  }
  
}

async function createSession(idToken:string){
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
}

async function createUser(user:UserCredential){
  const data = {
    name:user.user.displayName,
    email:user.user.email,
    photoUrl:user.user.photoURL,
    provider: user.user.providerId,
    uid:user.user.uid
  }

  const response = await fetch("/api/auth/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  const resBody = (await response.json()) as unknown as APIResponse<string>;
  if (response.ok && resBody.success) {
    return true;
  } else return false;

}