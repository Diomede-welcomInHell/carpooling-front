import {getTripFullById} from "@/lib/trip";
import {Booking, TripFull} from "@/config/zodSchema";
import {notFound} from "next/navigation";
import {Alert, CloseButton} from '@heroui/react';
import TripResumCard from "@/components/trip-component/detail/trip-resum-card";
import TripActions from "@/components/trip-component/detail/trip-actions";
import {cookies} from "next/headers";
import {getUserId} from "@/lib/id";
import TripTrajetCard from "@/components/trip-component/detail/trip-trajet-card";
import TripCarCard from "@/components/trip-component/detail/trip-car-card";
import TripDriverCard from "@/components/trip-component/detail/trip-driver-card";
import TripPassagerCard from "@/components/trip-component/detail/trip-passagers-card";
import TripActionsDriver from "@/components/trip-component/detail/trip-action-driver";

//TODO not found

export default async function TripsDetailPage({params}: { params: Promise<{ tripId: string }> }) {
    const flash: string | undefined = (await cookies()).get('flash')?.value;
    const {tripId} = await params;
    console.log("Vérification de l'idTrip récupéré 🆔" + tripId);
    const id: number = Number(tripId);
    const trip: TripFull | string = await getTripFullById(id);

    const idUser = await getUserId();

    if (typeof trip === 'string') {
        notFound(); // ou redirect(), ou affiche une erreur
    }

    const activeBookings: Booking[] = trip.all_booking?.filter(
        (booking) => !booking.cancel
    ) ?? [];

    const isDriver: boolean = trip.driver_id === idUser;

    const userBooking: Booking | undefined = (trip.all_booking ?? []).find(
        booking => booking.user_info.idUser === idUser && !booking.cancel
    );


    const isPassanger: boolean = !isDriver && userBooking !== undefined;
    const actionTripId: number = isPassanger ? userBooking!.idBooking : trip.id_trip;

    console.log("Je suis passager :", isPassanger);
console.log("actionTripId : ", actionTripId);
console.log("idBooking : ", activeBookings);

    return (
        <>
            {flash && (
                <div className="fixed top-4 right-4 z-50 left-1/2 -translate-x-1/2 max-w-md animate-in fade-in slide-in-from-top-2">
                <Alert status="success">
                    <Alert.Indicator/>
                    <Alert.Content>
                        <Alert.Title>{flash}</Alert.Title>
                    </Alert.Content>
                    <CloseButton/>
                </Alert>
                </div>
            )}
            <div className="min-h-screen bg-default-50 pb-30">
                <div className="mx-auto max-w-md mb-8 flex flex-col gap-4">
                    <TripResumCard
                        cityEnd={trip.arrival_address.city_name}
                        cityStart={trip.starting_address.city_name}
                        datetime={trip.trip_datetime}
                        available_seats={trip.available_seats}
                    />
                    <TripTrajetCard
                        cityEnd={trip.arrival_address.city_name}
                        streetEnd={trip.arrival_address.street_name}
                        codeEnd={trip.arrival_address.postal_code}
                        cityStart={trip.starting_address.city_name}
                        streetStart={trip.starting_address.street_name}
                        codeStart={trip.starting_address.postal_code}
                        km={trip.km}
                    />
                    <TripCarCard model={trip.car_info.model} brand={trip.car_info.brand}
                                 registration={trip.car_info.registration}/>

                    <TripDriverCard idUser={trip.driver_id}
                                    isPassager={isPassanger}
                                    firstname={trip.driver_info.firstname}
                                    lastname={trip.driver_info.lastname}
                                    email={trip.driver_info.email}
                                    phone={trip.driver_info.phone}/>

                    <TripPassagerCard
                        idUser={id}
                        isDriver={isDriver}
                        bookings={activeBookings}/>

                </div>
                {isPassanger ? (
                    <TripActions
                        buttonLabel="Annuler"
                        confirmationText="annulation"
                        tripId={actionTripId}
                        idDest={trip.driver_id ?? 0}
                        url={"/your-trips"}
                    />
                ) : (
                    <TripActionsDriver
                        buttonLabel="Supprimer"
                        confirmationText="suppression"
                        tripId={actionTripId}
                    />
                )}

            </div>
        </>
    );
}
