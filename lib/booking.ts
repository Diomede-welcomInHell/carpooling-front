'use server'
import {getUserId} from "./id";
import {apiFetch} from "@/lib/api";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {id} from "zod/locales";

export async function booking(id:string)  {
const idUser = await getUserId();
    const endpoint: string = "/api/trips/"+id+"/person";
    const option: RequestInit = { method: 'POST',
        body: JSON.stringify({person_id : idUser })
    };

    const res = await apiFetch(endpoint, option);

    //Afficher une erreur en cas de porblème
    if (!res.ok) {
        (await cookies()).set("flash", "Une erreur s'est produite, impossible de réserver", { maxAge: 5 });
        redirect('/trips/'+ id);
    }

    //Redirection
    const data = await res.json();
    console.log(JSON.stringify(data));
    redirect('/your-trips/'+ id);

}

export async function sendEmail(userDestId:number, msg:string )  {
    console.log("🐎 🦌 🦬 envoie de mail à l'utilisateur : "  + userDestId);

    const endpoint: string = "/api/trips/message";
    const option: RequestInit = { method: 'POST',
        body: JSON.stringify({recipientId : userDestId,
        body: msg})
    };

    const res = await apiFetch(endpoint, option);

    //Afficher une erreur en cas de porblème
    if (!res.ok) {
        (await cookies()).set("flash", "Une erreur s'est produite, impossible de réserver", { maxAge: 5 });
    }

    const data = await res.json();
    (await cookies()).set("flash", data.message, { maxAge: 5 });
}

export async function cancelBooking(idBooking:number)  {
    const endpoint: string = "/api/trips/booking/" + idBooking;
    const option: RequestInit = { method: 'PATCH'};

    console.log("Lancement d'une annulation")
    console.log("" + idBooking);

    const res = await apiFetch(endpoint, option);
    if (!res.ok) {
        (await cookies()).set("flash", "Une erreur s'est produite, impossible d'annuler la réservation'", { maxAge: 5 });
    }

    const data = await res.json();
    (await cookies()).set("flash", data.message, { maxAge: 5 });

    redirect('/trips');
}