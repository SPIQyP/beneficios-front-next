import { cert, getApps, initializeApp } from "firebase-admin/app";
import { DocumentData, DocumentReference, QueryDocumentSnapshot, getFirestore, initializeFirestore } from "firebase-admin/firestore";
import { firebaseApp } from "../firebase/firebase";


type CompaniesResponse = {
  companies: Company[],
  startAfter?: string
}
type Company = {
  id: string,
}

const db = getFirestore(firebaseApp)

export const getBanners = async () => {
    const banners = (await db.collection('banners').get()).docs.map(doc => doc.data());
   
    if (banners.length === 0) {
        return [];
    }
    return banners;
}

export const getCompanies = async (limit: number, statAfter?: string): Promise<CompaniesResponse> => {
    const result: CompaniesResponse = {
      companies: [],
    };
    const companies =  (await db.collection('companies').get()).docs;
    result.companies = companies.map(doc => {
      if(companies.indexOf(doc)) result.startAfter = doc.id;
      return {
          id:doc.id,
          ...doc.data()
      }
    });
    console.log(result);
    return result;
}

export const getCompany = async (id:string) => {
    const companyRef = db.doc(`companies/${id}`);
    const companyRes = await companyRef.get();
    return companyRes.data();
}

export const getBenefitsByCompany = async (companyId:string) => {
    const companyRef = db.doc(`companies/${companyId}`);

    const benefitsRef = db.collection('benefits');
    const benefitsRes = await benefitsRef.where('company','==', companyRef)
    .where('active','==',true).get();

    if (benefitsRes.empty) {
        return []
    }

    return benefitsRes.docs.map(doc => doc.data());
}
