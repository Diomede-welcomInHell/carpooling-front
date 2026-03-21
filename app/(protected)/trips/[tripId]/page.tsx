import {getTripById} from "@/lib/trip";
import {Trip} from "@/config/zodSchema";
import {notFound} from "next/navigation";
import { Surface } from '@heroui/react';
import { FaFlagCheckered } from "react-icons/fa6";
import TripResumCard from "@/components/trip-component/trip-resum-card";
import TripDetailCard from "@/components/trip-component/trip-detail-card";

//TODO not found

export default async function TripsDetailPage({ params } : { params: Promise<{ tripId: string }>}) {
    const { tripId } = await params;
    console.log("Vérification de l'idTrip récupéré 🆔" + tripId);
    const id: number = Number(tripId);
    const trip : Trip | null = await getTripById(id);

    if(!trip) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-default-50 pb-24">
            <div className="mx-auto max-w-md px-4 py-6 flex flex-col gap-4">
        <TripResumCard
            cityEnd={trip.arrival_address.city_name}
            cityStart={trip.starting_address.city_name}
            datetime={trip.trip_datetime}
            available_seats={trip.available_seats} />
                <TripDetailCard
                    cityEnd={trip.arrival_address.city_name}
                    streetEnd={trip.arrival_address.street_name}
                    codeEnd={trip.arrival_address.postal_code}
                    cityStart={trip.starting_address.city_name}
                    streetStart={trip.starting_address.street_name}
                    codeStart={trip.starting_address.postal_code}
                    km={trip.km}
                    carBrand={trip.car.brand}
                    carModel={trip.car.model}
                    driverFirstName={trip.driver.firstname}
                    driverLastName={trip.driver.lastname}/>
            </div>
            {/* ── Boutons + Modales ────────────────────────────────── */}
        </div>
    )

}