import { useCallback, useState } from "react";
import "../app/globals.css";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = () => {
    const { data: user } = useCurrentUser();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div
                className="
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            bg-zinc-900
            bg-opacity-90
            "
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
                <div
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                    "
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by language" />
                </div>
                <div className="
                lg:hidden
                flex
                flex-row
                items-center
                gap-2
                ml-8
                cursor-pointer
                relative
                "
                    onClick={toggleMobileMenu}
                >
                    <p className="text-white ext-sm">Browse</p>
                    <BsChevronDown className="text-white transition" />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative "
                    onClick={toggleAccountMenu}
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
                            <img className="text-white" src="/images/default-blue.jpg" alt="" />
                        </div>
                        <BsChevronDown className="text-white hover:text-gray-300 transition" />
                        <AccountMenu visible={showAccountMenu} label={user?.name}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;