import Link from "next/link";
import {GoArrowLeft} from "react-icons/go";

export default function RegisterPage() {
    return <>
        <header className="bg-blue-500 text-white flex flex-row">
            <Link href="/login"><GoArrowLeft /> </Link>
            <span className="mx-4">Inscription</span>
        </header>;
    </>
}