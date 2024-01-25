import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <>
        <div className="container mt-10 bg-cyan-800 py-20">
            <div className="grid grid-cols-12">
                <div className="col-span-4">
                    <h2 className="uppercase text-2xl font-bold text-white">Title</h2>
                    <div className="flex flex-col text-white">
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <h2 className="uppercase text-2xl font-bold text-white">Title</h2>
                    <div className="flex flex-col text-white">
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <h2 className="uppercase text-2xl font-bold text-white">Title</h2>
                    <div className="flex flex-col text-white">
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                        <Link href={""}>LINK 1</Link>
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="flex gap-4 items-center justify-center w-full ">
                {/* <Image src={"/img/logos/logo.png"} alt={""} width={100} height={100} /> */}
                <p>© 2024 LineaD. Todos los derechos reservados</p>
            </div>
        </div>
        
        </>
    )
} 

export default Footer;