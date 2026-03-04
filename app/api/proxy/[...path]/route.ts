// app/api/proxy/[...path]/route.ts

import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

async function proxyRequest(req: NextRequest, params: { path: string[] }) {
    // 1. Récupère le JWT depuis le cookie (côté serveur, il peut le lire)
    const token = (await cookies()).get('jwt')?.value

    // 2. Reconstruit l'URL de l'API réelle
    const path = params.path.join('/')
    const url = `${process.env.API_URL}/${path}`
    // ex: https://ton-api.com/users/me

    // 3. Récupère le body de la requête originale si besoin
    let body: string | undefined
    if (req.method !== 'GET' && req.method !== 'DELETE') {
        body = await req.text()
    }

    // 4. Fait la vraie requête vers l'API avec le JWT
    const res = await fetch(url, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
    })

    // 5. Renvoie la réponse de l'API au navigateur
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
