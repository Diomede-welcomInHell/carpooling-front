'use server';

import {apiFetch} from "./api";
import {getUserId} from "./id";
import {CarData} from "@/config/zodSchema";
import {revalidatePath} from "next/cache";

export async function getCar(id: number) {

    const endpoint: string = "/api/cars/" + id;
    const option: RequestInit = {method: 'GET'};

    const res = await apiFetch(endpoint, option);

    const data = await res.json();
    return {
        brand: data.brand,
        model: data.model,
        registration: data.registration,
        seats: data.seats,
    }
}


export async function addCar(prevState: unknown, formData: FormData) {

    console.log(formData);
    const carData = CarData.safeParse(
        {
            model: formData.get("model"),
            brand: formData.get("brand"),
            seats: formData.get("seats"),
            carRegistration: formData.get("carRegistration"),
        }
    )

    if(carData.error){
        return {
            error: carData.error.issues.map(e=>e.message).join(", "),
        }
    }

    const endpoint: string = "/api/cars";
    const option: RequestInit = {method: 'POST',
        body: JSON.stringify({
        model: carData.data.model,
        brand: carData.data.brand,
        seats: carData.data.seats,
        carRegistration: carData.data.carRegistration})
    };

    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { error: "Une erreur est survenue" };
    }
    const data = await res.json();

    revalidatePath("/my-account");
    return {
        id: data.id,
        model: data.model,
        brand: data.brand,
        seats: data.seats,
        carRegistration: data.carRegistration
    }
}


export async function updateCar(prevState: unknown, formData: FormData) {

    const carData = CarData.safeParse(
        {
            model: formData.get("model"),
            brand: formData.get("brand"),
            seats: formData.get("seats"),
            carRegistration: formData.get("carRegistration"),
        }
    )

    if(carData.error){
        return {
            error: carData.error.issues.map(e=>e.message).join(", "),
        }
    }

    const endpoint: string = "/api/cars/" + formData.get("id") ;

    const option: RequestInit = {method: 'PUT',
        body: JSON.stringify({
            model: carData.data.model,
            brand: carData.data.brand,
            seats: carData.data.seats,
            carRegistration: carData.data.carRegistration})
    };

    const res = await apiFetch(endpoint, option);

    if (!res.ok) {
        return { error: "Une erreur est survenue" };
    }
    const data = await res.json();

    revalidatePath("/my-account");
    return {
        id: data.id,
        model: data.model,
        brand: data.brand,
        seats: data.seats,
        carRegistration: data.carRegistration
    }
}

export async function deleteCar(id: number) {
    const endpoint: string = "/api/cars/" + id;
    const option: RequestInit = {method: 'DELETE'};
    const res = await apiFetch(endpoint, option);

    const data = await res.json();

    return {
        response : "Voiture supprimée"
    }
}