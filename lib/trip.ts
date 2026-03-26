'use server';

import {apiFetch} from "@/lib/api";
import {
    AddressSchema,
    TripCreateParams,
    TripParams,
    Trip,
    TripSchema,
    TripFullSchema,
    TripFull
} from "@/config/zodSchema";
import {getUserId} from "./id";
import * as z from "zod";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface Address {
    city_name: string;
    postal_code: string;
    street_name: string;
}

interface Driver {
    firstname: string;
    lastname: string;
    email: string;
    idUser: number | null;
}

interface Car {
    brand: string;
    model: string;
}

type TripFilters = {
    startingcity?: string;
    arrivalcity?: string;
    tripdate?: string;
};


export type TripsResult =
    | { success: true; data: Trip[] }
    | { success: false; error: string }

export type TripsFullResult =
    | { success: true; data: TripFull[] }
    | { success: false; error: string }



export async function testTrip(tripId: number) {
    console.log("✅ Réservation du trip :", tripId);
}

export async function getTripsFilter(filters?: TripFilters): Promise<TripsResult> {

    const tripData = TripParams.safeParse({
        startingcity: filters?.startingcity,
        arrivalcity: filters?.arrivalcity,
        tripdate: filters?.tripdate,
    });

    if (tripData.error) {
        return {
            success: false,
            error: tripData.error.issues.map(e => e.message).join(", ")
        };
    }

    let endpoint: string = "/api/trips/";
    const params = new URLSearchParams();

    if (tripData.data.startingcity) {
        params.append("startingcity", tripData.data.startingcity);
    }
    if (tripData.data.arrivalcity) {
        params.append("arrivalcity", tripData.data.arrivalcity);
    }
    if (tripData.data.tripdate) {
        params.append("tripdate", tripData.data.tripdate);
    }

    if (params.size > 0) {
        endpoint += "?" + params.toString();
    }

    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { success: false, error: "Une erreur est survenue" };
    }

    const data = await res.json();

    // L'API retourne un tableau de voyages
    return {success: true, data: z.array(TripSchema).parse(data)};

}

export async function getTripById(id: number) : Promise<Trip | null> {
    const endpoint: string = "/api/trips/" + String(id);
    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (res.status === 404) {
        return null; // géré avec notFound() dans la page
    }

    if (!res.ok) {
        throw new Error("Erreur lors de la récupération du trajet");
    }

    const trip = await res.json();
    
    return  TripSchema.parse(trip);
}

// conducteur
export async function getTripAsDriver() : Promise<TripsFullResult> {
    const userId = await getUserId();
    const endpoint: string = "/api/persons/" + userId + "/trips-driver";
    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { success: false, error: "Une erreur est survenue" };
    }

    const data = await res.json();

    if(Array.isArray(data) &&  data.length === 0) {
        return { success: false, error: "Aucun trajet" };
    }

    // L'API retourne un tableau de voyages
    return {success: true, data: z.array(TripFullSchema).parse(data)};
}

// passager
export async function getTripAsPassanger() : Promise<TripsFullResult> {
    const userId = await getUserId();
    const endpoint: string = "/api/persons/" + userId + "/trips-passenger";
    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { success: false, error: "Une erreur est survenue" };
    }

    const data = await res.json();

    if(Array.isArray(data) &&  data.length === 0) {
        return { success: false, error: "Aucun trajet" };
    }

    // L'API retourne un tableau de voyages
    return {success: true, data: z.array(TripFullSchema).parse(data)};
}

//detailler
export async function getTripFullById(idTrip : number) : Promise<TripFull | string> {
    const endpoint: string = "/api/trips/" + idTrip + "/person";

    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return "Une erreur est survenue";
    }

    const data = await res.json();

    // L'API retourne un tableau de voyages
    return (TripFullSchema).parse(data);
}




    export async function addTrip(prevState: unknown, formData: FormData) {
        console.log('formData :', formData);
        const person_id = await getUserId();

        const rawData = Object.fromEntries(formData.entries());

        const time = rawData.time.slice(0, 5)
        const trip_datetime = `${rawData.date} ${time}`;


        const starting_address = prepareAdresse(formData.get("starting_city") as string,
            formData.get("street_name_start") as string,);
        const arrival_address = prepareAdresse(formData.get("end_city") as string,
            formData.get("street_name_end") as string,);

        const tripData = TripCreateParams.safeParse({
            km: rawData.km,
            person_id: person_id,
            trip_datetime: trip_datetime,
            available_seats: rawData.available_seats,
            starting_address: starting_address,
            arrival_address: arrival_address,
        });

        if (tripData.error) {
            return {error: tripData.error.issues.map(e => e.message).join(", ")};
        }

        console.log("tripData to send :" + JSON.stringify(tripData.data));

        const endpoint: string = "/api/trips";

        const option: RequestInit = {
            method: 'POST',
            body: JSON.stringify(tripData.data)
        };

        const res = await apiFetch(endpoint, option);

        if (!res.ok) {
            const errorBody = await res.json();
            console.log("Error body:", errorBody);
            return {error: "Une erreur est survenue",
                fields: Object.fromEntries(formData), };

        }

        (await cookies()).set("flash", "Votre trajet a bien été ajouté", { maxAge: 5 });
        redirect("/your-trips")
    }

    function prepareAdresse(city_and_code : string, street : string) : AddressSchemaType {

        const [city_name, postal_code] = city_and_code.split(" ");

        console.log("city name" + city_name);
        const result =  AddressSchema.safeParse(
            {
                street_name: street,
                postal_code: postal_code?.trim(),
                city_name: city_name?.trim(),
            }
        );

        if (!result.success) {
            // Tu choisis comment gérer l'erreur : log, throw métier, valeur par défaut...
            console.error("Erreur de validation adresse :", result.error.message);
            throw new Error("Adresse invalide : " + result.error.message);
        }

        return result.data;
    }
type AddressSchemaType = z.infer<typeof AddressSchema>;


export async function deleteTripAsDriver(idTrip : string) {
    const endpoint: string = "/api/trips/" + idTrip;
    console.log(endpoint);
    const option: RequestInit = { method: 'DELETE' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        (await cookies()).set("flash", "Une erreur s'est produite, impossible de réserver", { maxAge: 5 });
    }

    const data = await res.json();
    console.log(JSON.stringify(data));

    // Redirige your/trip
    (await cookies()).set("flash", "Votre trajet a été supprimé, un message a été envoyé aux passagers", { maxAge: 5 });
    redirect("/your-trips")
}

