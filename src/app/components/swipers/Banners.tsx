'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";

interface BannersProps {
  content: any[];
}

const Banner = ({content}:BannersProps) => {
      return(
        <div>
          {/* {
            content.map((c:any,i:number) => (
              <p key={i} className="text-black">{c.url}</p>
            ))
          } */}
          
          <Swiper
            className={`swiperBenefits`}   
            navigation={true}
            pagination={true}
            modules={[Navigation,Pagination]}            
          >
            {
            content.map( (b:any , i:number) => (
                <SwiperSlide key={i}>
                    <div className="w-full">
                        <Image className="hidden lg:block" src={b.desktopImage} alt="banner" width={1500} height={500}/>
                        <Image className="lg:hidden w-full" src={b.mobileImage} alt="banner" width={338} height={438}/>
                    </div>
                </SwiperSlide> 
            ))
            }
             
          </Swiper>
        </div>
    )
}

export default Banner;