import { getCompanies } from "@/services/companies/compaies";
import Banner from "./components/swipers/Banners";
import SwiperBenefits from "./components/swipers/SwiperBenefits";
import { getBanners } from "@/services/banners/banners";



export default  async function Home() {
  
  const banners = await getBanners();
  const companiesResponse = await getCompanies(5);

  return (
    <main>
      <section>
        <Banner content={banners}/>
      </section>
      <section>
        <div className="container mt-6">
          <SwiperBenefits 
            title={"Códigos de descuento"} 
            linkCategory="/companies"
            description="¿Sos socio de Club LA NACION? Descargá tu código y disfrutá beneficios exclusivos en tus marcas favoritas" 
            contents={companiesResponse.companies}/>
        </div>
        <div className="container mt-6">
          <SwiperBenefits 
            linkCategory="/companies"
            title={"Nuevos Beneficios"} 
            contents={companiesResponse.companies}/>
        </div>
      </section>
    </main>
  );
}
