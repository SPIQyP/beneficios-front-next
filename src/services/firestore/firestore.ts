import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, initializeFirestore } from "firebase-admin/firestore";
import { firebaseApp } from "../firebase/firebase";


const db = getFirestore(firebaseApp)

export const getBanners = async () => {
    const banners = (await db.collection('banners').get()).docs.map(doc => doc.data());
   
    if (banners.length === 0) {
        return [];
    }
    return banners;
}

export const getCompanies = async () => {
    const companies = (await db.collection('companies').get()).docs.map(doc => {
        return {
            id:doc.id,
            data: doc.data()
        }
    });

    if (companies.length === 0 ){
        return [];
    }

    return companies;
}

export const getCompany = async (id:string) => {
    const companyRef = db.collection('companies');
    const companyRes = (await companyRef.doc(id).get()).data();
    return companyRes;
}

export const getBenefitsByCompany = async (companyId:string) => {
    const companyRef = db.collection('companies').doc(companyId);

    const benefitsRef = db.collection('benefits');
    const benefitsRes = await benefitsRef.where('company','==', companyRef)
    .where('active','==',true).get();

    if (benefitsRes.empty) {
        return []
    }

    return benefitsRes.docs.map(doc => doc.data());
}
