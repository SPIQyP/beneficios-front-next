import Image from "next/image";

const Menu = () => {
    return (
        <div className="container mt-6 mb-4">
            <nav>
                <div className="flex justify-between">
                    <Image className="" src={"/img/logos/logo.png"} alt={"logo"} width={130} height={30}/>
                    <div className="hidden lg:block">
                        <input className="rounded-xl px-2 border text-xl" placeholder="Buscar beneficio"/>
                    </div>
                    <button className="btn">Ingresar</button>
                </div>
            </nav>
        </div>
        
    )
}

export default Menu;