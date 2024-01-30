import Banner from "@/app/components/swipers/Banners";
import { getBanners, getBenefitsByCompany, getCompany } from "@/services/firestore/firestore";
import Link from "next/link";


export default async function BenefitPage({params:{slug}}:any) {
    const banners = await getBanners(); //hay que buscar las imagenes en media
    const company = await getCompany(slug);
    const benefits = await getBenefitsByCompany(slug);

    console.log('Estos son los beneficios de la empresa -->>> ',benefits)

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
                    <Banner content={banners}></Banner>
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
            <div className="container">

            </div>
        </div>
        </>
    )
}