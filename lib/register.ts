'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Register} from "@/config/zodSchema";

export async function register(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //type zod qui permet de récupérer les incohérences
    const registerInfo = Register.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("confPassword")
    });
    // jeter une erreur sur les paramètres sont faux
    if (registerInfo.error) {
        return {
            error: registerInfo.error.issues.map(e => e.message).join(", "),
            fields: { email: email},
        };
    }


    try {
        await fetch(`${process.env.API_URL}/api/auth/register`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
    } catch {
        return {error: 'Impossible de joindre le serveur'};
    }

    (await cookies()).set("flash", "Inscription réussie !", { maxAge: 5 });
    redirect('/login');

}