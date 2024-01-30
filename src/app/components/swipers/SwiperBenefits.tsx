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
    
    console.log("Contenido -->>>> ",content)
    
    return (
        <>
            <div className="text-black grid grid-cols-12 items-center">
                <div className="col-span-12 lg:col-span-8">
                    <h2 className="text-4xl font-bold ">{title}</h2>
                    <p className="mt-4">{description}</p>
                </div>
                <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
                    <Link className="text-2xl font-bold" href={'/'}>Mas beneficios</Link>
                </div>
            </div>
            <div className="flex justify-center mt-6">
            <Swiper
                className={`swiperBenefits`}   
                slidesPerView={1}
                spaceBetween={8}
                navigation={true}
                pagination={true}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 8
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 8
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 8
                    },
                    }}
                
                modules={[Navigation,Pagination]}            
            >
                {
                content.map( (content , i) => (
                    <SwiperSlide key={i}>
                        <CompanyCard content={content}/>
                    </SwiperSlide> 
                ))
                }
            </Swiper>
            </div>
        </>
    )
}

export default SwiperBenefits;