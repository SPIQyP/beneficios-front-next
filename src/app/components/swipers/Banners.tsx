'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";

const Banner = () => {
    return(
        <div>
          <Swiper
            className={`swiperBenefits`}   
            navigation={true}
            pagination={true}
            modules={[Navigation,Pagination]}            
          >
            {
            [1,2,3].map( (x , i) => (
                <SwiperSlide key={i}>
                    <div>
                        <Image src={'/img/beneficios/banner1.webp'} alt="banner" width={1500} height={500}/>
                    </div>
                </SwiperSlide> 
            ))
            }
             
          </Swiper>
        </div>
    )
}

export default Banner;