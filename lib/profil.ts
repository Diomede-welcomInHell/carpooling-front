'use server'

import { apiFetch } from "./api";
import {getUserId} from "./id";
import { ProfilData } from "@/config/zodSchema";


//TODO voir pour récupérer le profil de quelqu'un - voir le chemin de l'api qui n'est pas accéssible
export async function getProfil() {
    
    const option : RequestInit = {method : 'GET'}
    const endpoint : string = "api/persons/" + getUserId; 

    const res = apiFetch(endpoint, option);

    return res;
}

export async function addProfil(prevState: unknown, formData: FormData) {
    //TODO transformer zod
    const profilData = ProfilData.safeParse({
      firstname : formData.get("firstname"),
      lastname : formData.get("lastname"),
      phone : formData.get("phone")
     });

     if (profilData.error) {
        return {
            error: profilData.error.issues.map(e => e.message).join(", "),
        };
    }

const endpoint : string = "/api/persons/"; 
    

    const option : RequestInit = {method : 'POST',
       body: JSON.stringify({ firstName: profilData.data.firstname,
        lastName: profilData.data.lastname,
        phone : profilData.data.phone }), 
    }

const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { error: "Une erreur est survenue" };
    }
    const data = await res.json();

console.log(data);

    return { firstname: data.firstname,
        lastname: data.lastname,
        phone : data.phone
     };

}
