import { getBanners, getCompanies } from "@/services/firestore/firestore";
import Banner from "./components/swipers/Banners";
import SwiperBenefits from "./components/swipers/SwiperBenefits";



export default  async function Home() {
  
  const banners = await getBanners();
  const companies = await getCompanies();

  return (
    <main>
      <section>
        <Banner content={banners}/>
      </section>
      <section>
        <div className="container mt-6">
          <SwiperBenefits 
            title={"Códigos de descuento"} 
            description="¿Sos socio de Club LA NACION? Descargá tu código y disfrutá beneficios exclusivos en tus marcas favoritas" 
            content={companies}/>
        </div>
        <div className="container mt-6">
          <SwiperBenefits 
            title={"Nuevos Beneficios"} 
            content={companies}/>
        </div>
      </section>
    </main>
  );
}
