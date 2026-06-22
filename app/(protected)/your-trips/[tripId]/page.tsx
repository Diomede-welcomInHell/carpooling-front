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

    const activeBookings: Booking[] = trip.allBooking?.filter(
        (booking) => !booking.cancel
    ) ?? [];

    const isDriver: boolean = trip.driverId === idUser;

    const userBooking: Booking | undefined = (trip.allBooking ?? []).find(
        booking => booking.user_info.idUser === idUser && !booking.cancel
    );


    const isPassanger: boolean = !isDriver && userBooking !== undefined;
    const actionTripId: number = isPassanger ? userBooking!.idBooking : trip.idTrip;

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
                        cityEnd={trip.arrivalAddress.cityName}
                        cityStart={trip.startingAddress.cityName}
                        datetime={trip.tripDatetime}
                        available_seats={trip.availableSeats}
                    />
                    <TripTrajetCard
                        cityEnd={trip.arrivalAddress.cityName}
                        streetEnd={trip.arrivalAddress.streetName}
                        codeEnd={trip.arrivalAddress.postalCode}
                        cityStart={trip.startingAddress.cityName}
                        streetStart={trip.startingAddress.streetName}
                        codeStart={trip.startingAddress.postalCode}
                        km={trip.km}
                    />
                    <TripCarCard model={trip.carInfo.model} brand={trip.carInfo.brand}
                                 registration={trip.carInfo.registration}/>

                    <TripDriverCard idUser={trip.driverId}
                                    isPassager={isPassanger}
                                    firstname={trip.driverInfo.firstname}
                                    lastname={trip.driverInfo.lastname}
                                    email={trip.driverInfo.email}
                                    phone={trip.driverInfo.phone}/>

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
                        idDest={trip.driverId ?? 0}
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
