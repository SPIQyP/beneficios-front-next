import { db } from "../firestore/firestore"

export const getBanners = async () => {
    const banners = (await db.collection('banners').get()).docs.map(doc => doc.data());
   
    if (banners.length === 0) {
        return [];
    }
    return banners;
}