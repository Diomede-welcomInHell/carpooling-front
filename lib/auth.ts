'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    let res: Response;

    try {
        res = await fetch(`${process.env.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
    } catch {
        return {error : 'Impossible de joindre le serveur'};
    }

    if (!res.ok) {
        return {error : "L'identifiant ou le mot de passe est incorrect"};
    }

    const data = await res.json();

    const token = data.token;

    if (!token) {
        return { error: 'Token manquant dans la réponse' }
    }

    (await cookies()).set("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // ← HTTPS uniquement en prod
        sameSite: 'lax', // ← protection CSRF
        maxAge: 60 * 60 * 24,
        path: '/',
    });

    redirect('/search-trip');

}

export async function logout() {
    (await cookies()).delete('jwt')
    redirect('/login')
}