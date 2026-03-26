
import NavLink from "@/components/nav-link";
import { FaCarOn, FaMagnifyingGlass } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { TbCarGarage} from "react-icons/tb";

const navItems = [
    { href: "/trips", icon: FaMagnifyingGlass, label: "Rechercher" },
    { href: "/your-trips", icon: TbCarGarage, label: "Mes trajets" },
    { href: "/new-trip", icon: FaCarOn, label: "Proposer" },
    { href: "/my-account", icon: MdAccountCircle, label: "Compte" },
];

export default function MainHeader() {
    return (
        <>
            {/* ── Desktop : barre en haut ── */}
            <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-divider shadow-sm px-8 items-center justify-between">
                <span className="text-foreground font-bold text-lg tracking-tight">
                    CoVoiturage
                </span>
                <nav className="flex items-center gap-2">
                    {navItems.map(({ href, icon: Icon, label }) => (
                        <NavLink key={href} href={href}>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-default-500 hover:text-foreground hover:bg-default-100 transition-colors">
                                <Icon size={18} />
                                <span className="text-sm font-medium">{label}</span>
                            </div>
                        </NavLink>
                    ))}
                </nav>
            </header>

            {/* ── Mobile : barre en bas ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-divider shadow-lg">
                <div className="flex items-center justify-around px-2 py-2 pb-safe">
                    {navItems.map(({ href, icon: Icon, label }) => (
                        <NavLink key={href} href={href}>
                            <div className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-default-400 hover:text-primary transition-colors">
                                <Icon size={22} />
                                <span className="text-[10px] font-medium">{label}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* ── Spacer desktop pour que le contenu ne passe pas sous la nav ── */}
            <div className="hidden md:block h-16" />
        </>
    );
}