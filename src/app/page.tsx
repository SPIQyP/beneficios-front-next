import Banner from "./components/swipers/Banners";
import SwiperBenefits from "./components/swipers/SwiperBenefits";



export default function Home() {

  return (
    <main>
      <section>
        <Banner/>
      </section>
      <section>
        <div className="container mt-6">
          <SwiperBenefits 
            title={"Códigos de descuento"} 
            description="¿Sos socio de Club LA NACION? Descargá tu código y disfrutá beneficios exclusivos en tus marcas favoritas" 
            content={[1,2,3,4,5,6,7,8]}/>
        </div>
        <div className="container mt-6">
          <SwiperBenefits 
            title={"Nuevos Beneficios"} 
            content={[1,2,3,4,5,6,7,8]}/>
        </div>
      </section>
    </main>
  );
}
