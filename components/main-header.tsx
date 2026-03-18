import Link from "next/link";
import NavLink from "@/components/nav-link";
import { FaCarOn, FaMagnifyingGlass } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { TbCarGarage, TbCarFilled } from "react-icons/tb";

export default function MainHeader() {
    return (
        <header className="w-full pt-6 px-2 main-header bg-blue-500 text-white">
Header
            <nav className="flex flex-wrap items-center justify-between">
                <NavLink href={'/all-trips'}>
                    <div className="flex flex-col items-center justify-between">
                        <TbCarFilled />
                        Tous les trajets
                    </div>
                </NavLink>
                <NavLink href={'/search-trip'}>
                    <div className="flex flex-col items-center justify-between">
                        <FaMagnifyingGlass />
                        Rechercher un trajet
                    </div>
                </NavLink>
                <NavLink href={'/your-trips'}>
                    <div className="flex flex-col items-center justify-between">
                        <TbCarGarage />
                        Vos Trajets
                    </div>
                </NavLink>
                <NavLink href={'/new-trip'}>
                    <div className="flex flex-col items-center justify-between">
                        <FaCarOn />
                        Publier un trajet
                    </div>
                </NavLink>
                <NavLink href={'/my-account'}>
                    <div className="flex flex-col items-center justify-between">
                        <MdAccountCircle />
                        Mon compte
                    </div>
                </NavLink>
            </nav>
        </header>
    )
}