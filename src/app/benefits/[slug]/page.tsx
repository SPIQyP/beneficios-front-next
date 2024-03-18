import BenefitCard from "@/app/components/benefitCard/BenefitCard";
import Banner from "@/app/components/swipers/Banners";
import { getCurrentUser, isUserAuthenticated } from "@/services/auth/auth.service";
import { getBanners } from "@/services/banners/banners";
import { getBenefitsByCompany, getCompany, getImageByCompany } from "@/services/companies/companies";
import { Button } from "@nextui-org/react";
import Link from "next/link";


export default async function BenefitPage({params:{slug}}:any) {
    const banners = await getBanners(); //hay que buscar las imagenes en media
    const company = await getCompany(slug);
    const benefits = await getBenefitsByCompany(slug);
    const companyImages = await getImageByCompany(slug);

    if (!company) {
        console.log("no se consiguio la compañia!!! envio a pagina 404")
        return
    }

    const isAuthenticated = await isUserAuthenticated();
    const user = await getCurrentUser();
    
    return(
        <>
        <div className="container">
            <div className="flex gap-2 text-black">
                <p>{`Beneficios > Categoria > ${company.name}`}</p>
            </div>
            <div className="flex flex-col lg:flex-row text-black mt-6">
                <h1 className="text-4xl">{company.name}</h1>
                <button className="w-fit lg:ml-auto mt-2 lg:mt-0">Compartir</button>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                    <Banner content={companyImages} isCompany={true}></Banner>
                </div>
                <div className="col-span-12 lg:col-span-6 text-black flex">
                    <div className="p-4 rounded-xl w-2/3 drop-shadow-md">
                        <p>Un lugar para compartir entre amigos, relajarse en la arena y realizar actividades. Podes venir a divertirte con amigos y familia, y pasar un dia de playa distinto!</p>
                        <p className="mt-4">{company.phone}</p>
                        <p>{company.email}</p>
                        <Link href={company.website}>{company.website}</Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 mt-10">
                {
                    benefits.map((benefit:any, i:number) => (
                        <BenefitCard key={i}
                        title={benefit.title}
                        isAuthenticated={isAuthenticated} 
                        id={benefit.id} 
                        description={benefit.description} 
                        startDate={benefit.startDate.toDate().toLocaleDateString()} 
                        endDate={benefit.endDate.toDate().toLocaleDateString()}
                        userUid={user ?  user!.uid : ''} 
                        emailUser={user ? user!.email: ''}
                        termsAndConditions={benefit.termsAndConditions}/>
                    ))
                }
            </div>
        </div>
        </>
    )
}