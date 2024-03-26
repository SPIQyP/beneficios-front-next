
'use client'
import { signOut } from "@/services/auth/auth.client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Search from "../search/search";
import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Listbox, ListboxItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";

interface MenuProps {
    isSession:boolean;
    userAuth?:any;
}

const Menu = ({isSession, userAuth}:MenuProps) => {
    const router = useRouter();
    const [session, setSession] = useState(isSession);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let user;
    if (session) {
        user = JSON.parse(userAuth);
    }
    

    const logout = async () => {
        const isOk = await signOut();
        if (isOk) setSession(false);
    }

    const menuItems = [
        "Categorias",
    ];


    return (
        <Navbar className="text-black" maxWidth="xl">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <Link href="/">
                    <Image className="" src={"/img/logos/logo.png"} alt={"logo"} width={130} height={30}/>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center">
            <div className="hidden lg:flex justify-center h-fit max-h-8">
                <Search/>
            </div>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className={`${session ? 'hidden' : 'block'}`}>
                    <Button as={Link} color="primary" href="/sign-in/" variant="flat">
                        Ingresar
                    </Button>
                </NavbarItem>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                        as="button"
                        className={`transition-transform ${session ? 'block' : 'hidden'}`}
                        name={`${session ? user.displayName : ''}`}
                        size="sm"
                        src={`${session ? user.photoURL : ''}`}
                        />
                    </DropdownTrigger>
                    <DropdownMenu className="text-black" aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Inicio sesion como</p>
                        <p className="font-semibold">{`${session ? user.email : ''}`}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">Perfil</DropdownItem>
                        <DropdownItem key="help_and_feedback">Ayuda</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            <Link href="/" onClick={() => logout()}>Cerrar Sesion</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} className="text-black">
                        <Link
                        color={
                            index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                        }
                        className="w-full"
                        href="#"
                        size="lg"
                        >
                        {item}
                        </Link>
                    <Divider className="my-4" />
                    </NavbarMenuItem>
                    ))}
                        <Listbox
                            className="text-black"
                            aria-label="Actions"
                            onAction={(key) => alert(key)}
                        >
                            <ListboxItem key="restaurants">Restaurantes</ListboxItem>
                            <ListboxItem key="turismo">Turismo</ListboxItem>
                        </Listbox>
                </NavbarMenu>

        </Navbar>
        
    )
}

export default Menu;