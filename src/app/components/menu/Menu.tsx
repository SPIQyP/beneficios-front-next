
'use client'
import { signOut } from "@/services/auth/auth.client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Search from "../search/search";

interface MenuProps {
    isSession:boolean;
}

const Menu = ({isSession}:MenuProps) => {
    const router = useRouter();
    const [user, setUser] = useState(isSession)
    

    const logout = async () => {
        console.log('logout')
        const isOk = await signOut();
        if (isOk) setUser(false);
    }



    return (
        <div className="container mt-6 mb-4">
            <nav>
                <div className="flex justify-between">
                    <Link href="/">
                        <Image className="" src={"/img/logos/logo.png"} alt={"logo"} width={130} height={30}/>
                    </Link>
                    <div className="hidden lg:flex w-1/2 justify-center h-fit max-h-8">
                        <Search/>
                    </div>
                    <Link href="/sign-in/" className={`btn ${user ? 'hidden' : 'block'}`}>Ingresar</Link>
                    <Link href="/" className={`btn ${user ? 'block' : 'hidden'}`} onClick={() => logout()}>Cerrar Sesion</Link>
                </div>
            </nav>
        </div>
        
    )
}

export default Menu;