import { decodeJwt } from "jose";
import {cookies} from "next/headers";

export async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    
    if (!token) return null;
    
    const payload = decodeJwt(token); // pas de vérification de signature
    return payload.sub ?? payload.id ?? payload.userId; // selon comment ton backend nomme le champ
}