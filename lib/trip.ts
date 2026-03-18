'use server';

import {apiFetch} from "@/lib/api";
import {AddressSchema, TripCreateParams, TripParams} from "@/config/zodSchema";
import {getUserId} from "./id";
import * as z from "zod";

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

interface TripResponse {
    idTrip: number;
    km: number;
    available_seats: number;
    trip_datetime: string;
    driver: Driver;
    car: Car;
    starting_address: Address;
    arrival_address: Address;
    idAdresse: number | null;
}


export async function getTripsFilter(formData: FormData) {
    console.log('formData :', formData);

    const tripData = TripParams.safeParse({
        startingcity: formData.get("startingcity"),
        arrivalcity: formData.get("arrivalcity"),
        tripdate: formData.get("tripdate"),
    });

    if (tripData.error) {
        return {
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

    console.log(endpoint);

    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { error: "Une erreur est survenue" };
    }

    const data = await res.json();

    // L'API retourne un tableau de voyages
    return {
        trips: data.map((trip: TripResponse) => ({
            idTrip: trip.idTrip,
            km: trip.km,
            availableSeats: trip.available_seats,
            tripDatetime: trip.trip_datetime,
            driver: {
                firstname: trip.driver.firstname,
                lastname: trip.driver.lastname,
                email: trip.driver.email,
            },
            car: {
                brand: trip.car.brand,
                model: trip.car.model,
            },
            startingAddress: {
                cityName: trip.starting_address.city_name,
                postalCode: trip.starting_address.postal_code,
                streetName: trip.starting_address.street_name,
            },
            arrivalAddress: {
                cityName: trip.arrival_address.city_name,
                postalCode: trip.arrival_address.postal_code,
                streetName: trip.arrival_address.street_name,
            },
        }))
    };
}

export async function getTripById(id: number) {
    const endpoint: string = "/api/trips/" + id;
    const option: RequestInit = { method: 'GET' };
    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { error: "Une erreur est survenue" };
    }

    const trip = await res.json();

    return {
            idTrip: trip.idTrip,
            km: trip.km,
            availableSeats: trip.available_seats,
            tripDatetime: trip.trip_datetime,
            driver: {
                firstname: trip.driver.firstname,
                lastname: trip.driver.lastname,
                email: trip.driver.email,
            },
            car: {
                brand: trip.car.brand,
                model: trip.car.model,
            },
            startingAddress: {
                cityName: trip.starting_address.city_name,
                postalCode: trip.starting_address.postal_code,
                streetName: trip.starting_address.street_name,
            },
            arrivalAddress: {
                cityName: trip.arrival_address.city_name,
                postalCode: trip.arrival_address.postal_code,
                streetName: trip.arrival_address.street_name,
            },
        }

}

    export async function addTrip(prevState: unknown, formData: FormData) {
        console.log('formData :', formData);
        const person_id = await getUserId();

        const rawData = Object.fromEntries(formData.entries());

        const time = rawData.time.slice(0, 5)
        const trip_datetime = `${rawData.date} ${time}`;
        console.log("🕰️ Trip time" + trip_datetime);

            console.log("🧟 id user" + person_id);

        console.log("🚗 km" + rawData.km);

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

        const endpoint: string = "/api/trips/";

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

        return {success: "Votre voyage a bien été enregistré"};
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

