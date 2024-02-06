import Banner from "@/app/components/swipers/Banners";
import { getBanners } from "@/services/banners/banners";
import { getBenefitsByCompany, getCompany, getImageByCompany } from "@/services/companies/compaies";
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

    return(
        <>
        <div className="container">
            <div className="flex gap-2 text-black">
                <p>{`Beneficios > Categoria > ${company.name}`}</p>
            </div>
            <div className="flex text-black mt-6">
                <h1 className="text-4xl">{company.name}</h1>
                <button className="ml-auto">Compartir</button>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <Banner content={companyImages} isCompany={true}></Banner>
                </div>
                <div className="col-span-6 text-black flex">
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
                        <div key={i} className="col-span-8 text-black border p-8 rounded-lg mb-10">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-4xl font-bold">{benefit.title}</h3>
                                <p className="text-xl">{benefit.description}</p>
                                <p>{`Disponible de : ${benefit.startDate.toDate().toLocaleDateString()} hasta ${benefit.endDate.toDate().toLocaleDateString()}`}</p>
                                <p>{benefit.termsAndConditions}</p>
                                <button className="btn w-fit text-white">Iniciar session</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}