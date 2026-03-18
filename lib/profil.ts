'use server'

import { apiFetch } from "./api";
import {getUserId} from "./id";
import { ProfilData } from "@/config/zodSchema";


export async function getProfil() {

    const id = await getUserId();
    const option : RequestInit = {method : 'GET'}
    const endpoint : string = "/api/persons/" + id;

    const res = await apiFetch(endpoint, option);

    const data = await res.json();

    return {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        id_car: data.idCar,
    };

}

export async function addProfil(prevState: unknown, formData: FormData) {

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


export async function updateProfil(prevState: unknown, formData: FormData) {

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

    const id = await getUserId();
    const endpoint : string = "/api/persons/" + id;

    const option : RequestInit = {method : 'PATCH',
        body: JSON.stringify({ firstname: profilData.data.firstname,
            lastname: profilData.data.lastname,
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