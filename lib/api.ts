import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = (await cookies()).get('jwt')?.value

    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    // Token expiré ou invalide → déconnexion automatique
    if (res.status === 401) {
        (await cookies()).delete('jwt')
        redirect('/login')
    }

    return res
}


export async function clientFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const res = await fetch(`/api/proxy${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    // Token expiré → on redirige manuellement côté client
    if (res.status === 401) {
        window.location.href = '/login'
        return res
    }

    return res
}