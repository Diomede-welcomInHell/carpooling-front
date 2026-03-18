import { decodeJwt } from "jose";
import {cookies} from "next/headers";

export async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    
    if (!token) return null;
    
    const payload = decodeJwt(token); // pas de vérification de signature
    console.log("Decode JWT : " + JSON.stringify(payload, null, 2));
    console.log("payload.idUser" + payload.idUser);
    console.log("payload.idUser" + JSON.stringify(payload.idUser));
    console.log("ID utilisateur :", payload.idUser, typeof payload.idUser);
    return  payload.idUser// selon comment ton backend nomme le champ
}