import { db } from "../firestore/firestore"
import { FieldPath } from "firebase-admin/firestore";

type CompaniesResponse = {
    companies: Company[],
    startAfter?: string
}
export type Company = {
    id: string;
    address:string;
    categories:any[];
    companyImage:string;
    description:string;
    email:string;
    location:any[];
    name:string;
    phone:number;
    socialMedia:any;
    website:string;
}

export const getCompanies = async (limit: number, statAfter?: string): Promise<CompaniesResponse> => {
    const result: CompaniesResponse = {
      companies: [],
    };
    let companiesRef = db.collection('companies').orderBy(FieldPath.documentId());
    
    if (statAfter) {
        console.log('entre al if de startAfter !!!',statAfter)
        companiesRef.startAfter(statAfter);
    }

    const companies =   (await companiesRef.limit(limit).get()).docs;
    
    result.companies = companies.map(doc => {
      if(companies.indexOf(doc)) result.startAfter = doc.id;
      return {
          id:doc.id,
          ...doc.data() 
      } as Company
    });
    
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

export const getImageByCompany = async (companyId:string) => {
    const companyRef = db.doc(`companies/${companyId}`);

    const mediaRef = db.collection('media');
    const mediaResp = await mediaRef.where('company','==',companyRef).get();
    if (mediaResp.empty) {
        return [];
    }

    return mediaResp.docs.map(doc => doc.data().image);
}