'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
    href: string;
    children: ReactNode;
}

export default function NavLink({href, children}:NavLinkProps) {
    const path = usePathname();
    return (
        <Link href={href} className={`pd-1
            ${path.startsWith(href) ? "text-white border-b-2 border-white" :
            "text-gray-400 hover:border-b-2 hover:border-b-gray-400"}
        `}
            >
            {children}
        </Link>
    )
}