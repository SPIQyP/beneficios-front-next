import { cert, getApps, initializeApp } from "firebase-admin/app";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert(JSON.parse(process.env.FIREBASE_API_KEY || '')),
    },
    "firebase-admin-app"
  );