import {getTripById} from "@/lib/trip";
import {Trip} from "@/config/zodSchema";
import {notFound} from "next/navigation";
import {Alert, CloseButton, Surface} from '@heroui/react';
import {FaFlagCheckered} from "react-icons/fa6";
import TripResumCard from "@/components/trip-component/detail/trip-resum-card";
import TripDetailCard from "@/components/trip-component/detail/trip-detail-card";
import TripActions from "@/components/trip-component/detail/trip-actions";
import {cookies} from "next/headers";

//TODO not found

export default async function TripsDetailPage({params}: { params: Promise<{ tripId: string }> }) {
    const flash : string | undefined = (await cookies()).get('flash')?.value;
    const {tripId} = await params;
    console.log("Vérification de l'idTrip récupéré 🆔" + tripId);
    const id: number = Number(tripId);
    const trip: Trip | null = await getTripById(id);

    if (!trip) {
        notFound();
    }

    console.log("Verif id : " + trip.driver.idUser);
    console.log("Verif id : " + trip.driver.email);
    return (
        <>
            {flash && (
                <div className="fixed top-4 right-4 z-50 left-1/2 -translate-x-1/2 max-w-md animate-in fade-in slide-in-from-top-2">
                <Alert>
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>{flash}</Alert.Title>
                    </Alert.Content>
                    <CloseButton />
                </Alert>
                </div>
            )}
        <div className="min-h-screen bg-default-50 pb-30 ">
            <div className="mx-auto max-w-md mb-8 flex flex-col gap-4">
                <TripResumCard
                    cityEnd={trip.arrivalAddress.cityName}
                    cityStart={trip.startingAddress.cityName}
                    datetime={trip.tripDatetime}
                    available_seats={trip.availableSeats}/>
                <TripDetailCard
                    cityEnd={trip.arrivalAddress.cityName}
                    streetEnd={trip.arrivalAddress.streetName}
                    codeEnd={trip.arrivalAddress.postalCode}
                    cityStart={trip.startingAddress.cityName}
                    streetStart={trip.startingAddress.streetName}
                    codeStart={trip.startingAddress.postalCode}
                    km={trip.km}
                    carBrand={trip.car.brand}
                    carModel={trip.car.model}
                    driverFirstName={trip.driver.firstname}
                    driverLastName={trip.driver.lastname}/>
            </div>
            <TripActions
                buttonLabel="Réserver"
                confirmationText="réservation"
                tripId={id}
                idDest={trip.driver.idUser ?? 0}
                url={"/trips"}
            />
        </div>
        </>
    )

}