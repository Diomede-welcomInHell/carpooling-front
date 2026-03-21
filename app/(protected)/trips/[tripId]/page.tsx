import {getTripById} from "@/lib/trip";
import {Trip} from "@/config/zodSchema";
import {notFound} from "next/navigation";
import { Surface } from '@heroui/react';
import { FaFlagCheckered } from "react-icons/fa6";

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

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
                        <h3 className="text-base font-semibold text-foreground">
                            {trip.starting_address.city_name}
                        </h3>
                        <p className="text-sm text-muted">

                        </p>
                    </Surface>
                </div>
                <div className="flex flex-col gap-2">
                    <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
                        <h3 className="text-base font-semibold text-foreground">
                            Trajet
                        </h3>
                        <p className="text-sm text-muted">
                            <FaFlagCheckered />  {trip.arrival_address.street_name}, {trip.arrival_address.city_name} ({trip.arrival_address.postal_code})
                        </p>
                    </Surface>
                </div>
            </div>


    )

}