'use client'
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import CompanyCard from "../companyCard/CompanyCard";

interface SwiperBenefitsProps {
    title:string;
    description?:string;
    content: any[];
}
const SwiperBenefits = ({title,content,description}:SwiperBenefitsProps) => {
    return (
        <>
            <div className="text-black flex items-center">
                <div>
                    <h2 className="text-4xl font-bold ">{title}</h2>
                    <p className="mt-4">{description}</p>
                </div>
                <div className="ml-auto">
                    <Link className="text-2xl font-bold" href={'/'}>Mas beneficios</Link>
                </div>
            </div>
            <div className="flex justify-center mt-6">
            <Swiper
                className={`swiperBenefits`}   
                slidesPerView={4}
                spaceBetween={8}
                navigation={true}
                pagination={true}
                modules={[Navigation,Pagination]}            
            >
                {
                content.map( (x , i) => (
                    <SwiperSlide key={i}>
                        <CompanyCard/>
                    </SwiperSlide> 
                ))
                }
            </Swiper>
            </div>
        </>
    )
}

export default SwiperBenefits;