import Image from "next/image"
import Link from "next/link";

const CompanyCard = () => {
    return (
        <>
        <Link href={'/benefits/delta-point'}>
        <div className="flex flex-col rounded-xl text-black border-2 border-gray-400 border-opacity-50 overflow-hidden">
            <Image src={"/img/beneficios/beneficio1.webp"} alt={"benefit-img"} width={380} height={257}/>
            <div className="px-4 py-6">
                <h1 className="uppercase  font-bold">Delta Point</h1>
                <p>Descripcion</p>
            </div>
            
        </div>
        </Link>
        </>
    )
}

export default CompanyCard;