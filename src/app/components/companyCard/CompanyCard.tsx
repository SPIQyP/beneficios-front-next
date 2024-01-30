import Image from "next/image"
import Link from "next/link";

interface CompanyCardProps{
    content: any;
}

const CompanyCard = ({content}:CompanyCardProps) => {
    return (
        <>
        <Link href={`/benefits/${content.id}`}>
        <div className="flex flex-col rounded-xl text-black border-2 border-gray-400 border-opacity-50 overflow-hidden">
            <Image src={content.data.companyImage} alt={"benefit-img"} width={380} height={257}/>
            <div className="px-4 py-6">
                <h1 className="uppercase  font-bold">{content.data.name}</h1>
                <p>{content.data.description}</p>
            </div>
            
        </div>
        </Link>
        </>
    )
}

export default CompanyCard;