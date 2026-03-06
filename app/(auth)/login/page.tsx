import {cookies} from "next/headers";
import LoginFrom from "@/components/LoginForm";


export default async function LoginPage() {
    const flash : string | undefined = (await cookies()).get('flash')?.value;

    return <LoginFrom flash = {flash} />

}