import Banner from "@/app/components/swipers/Banners";
import Link from "next/link";

export default async function BenefitPage() {
    return(
        <>
        <div className="container">
            <div className="flex gap-2 text-black">
                <p>{`Beneficios > Categoria > Delta point`}</p>
            </div>
            <div className="flex text-black mt-6">
                <h1 className="text-4xl">DELTA POINT</h1>
                <button className="ml-auto">Compartir</button>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <Banner></Banner>
                </div>
                <div className="col-span-6 text-black flex">
                    <div className="p-4 rounded-xl w-2/3 drop-shadow-md">
                        <p>Un lugar para compartir entre amigos, relajarse en la arena y realizar actividades. Podes venir a divertirte con amigos y familia, y pasar un dia de playa distinto!</p>
                        <p className="mt-4">11 5765 4002</p>
                        <p>info@deltapointeventos.com.ar</p>
                        <Link href={""}>http://www.deltapointeventos.com.ar/</Link>
                    </div>
                </div>
            </div>
            <div className="container">

            </div>
        </div>
        </>
    )
}