import { cert, getApps, initializeApp } from "firebase-admin/app";
import { initializeFirestore } from "firebase-admin/firestore";

const sa = {}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(sa),
      });

const db = initializeFirestore(app);

export const getBanners = async () => {
    const docRef = db.collection('banners');
    const bannersRef = await docRef.get();
    if (bannersRef.empty) {
        return [];
    }

    const banners = bannersRef.docs.map(doc => doc.data());
    return banners
}

