import { Company } from "@/services/companies/companies";
import Image from "next/image"
import Link from "next/link";

interface CompanyCardProps{
    content: Company;
}

const CompanyCard = ({content}:CompanyCardProps) => {
    return (
        <>
        <Link href={`/benefits/${content.id ? content.id : content.objectId}`}>
        <div className="flex flex-col rounded-xl text-black border-2 border-gray-400 border-opacity-50 overflow-hidden">
            <Image className="min-h-[220px] max-h-[220px] object-cover w-full" src={content.companyImage} alt={"benefit-img"} width={380} height={257} />
            <div className="px-4 py-6">
                <h1 className="uppercase text-base font-bold min-h-[48px]">{content.name}</h1>
                <p className="min-h-[48px]">{content.description}</p>
            </div>
            
        </div>
        </Link>
        </>
    )
}

export default CompanyCard;