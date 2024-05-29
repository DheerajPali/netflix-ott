import React from "react"
import "../app/globals.css";

interface NavbarItemProps {
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {

    return (
        <div
            className="
            text-white
            cursor-pointer
            hover:text-gray-300
            transition
        "
        >
            {label}
        </div>
    )
}

export default NavbarItem