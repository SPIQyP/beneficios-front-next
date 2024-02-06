import { Company } from "@/services/companies/compaies";
import Image from "next/image"
import Link from "next/link";

interface CompanyCardProps{
    content: Company;
}

const CompanyCard = ({content}:CompanyCardProps) => {
    return (
        <>
        <Link href={`/benefits/${content.id}`}>
        <div className="flex flex-col rounded-xl text-black border-2 border-gray-400 border-opacity-50 overflow-hidden">
            <Image className="max-h-[220px] object-cover " src={content.companyImage} alt={"benefit-img"} width={380} height={257} />
            <div className="px-4 py-6">
                <h1 className="uppercase  font-bold">{content.name}</h1>
                <p>{content.description}</p>
            </div>
            
        </div>
        </Link>
        </>
    )
}

export default CompanyCard;