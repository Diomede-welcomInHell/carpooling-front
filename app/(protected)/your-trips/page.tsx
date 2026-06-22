import {getTripAsDriver, getTripAsPassanger, TripsFullResult} from "@/lib/trip";
import {CardTripPreview} from "@/components/trip-component/card-preview-trip";
import Divider from "@/components/divider";
import {cookies} from "next/headers";
import {Alert, CloseButton} from "@heroui/react";
import {getUserId} from "@/lib/id";

export default async function YourTrips() {
    const flash : string | undefined = (await cookies()).get('flash')?.value;
    const resDriver = await getTripAsDriver();
    const resPassanger = await getTripAsPassanger();
    const currentUserId =  await getUserId();


    // On ajoute currentUserId aux arguments
    function showTrips(res: TripsFullResult, ) {
        if (!res.success) {
            return <p className="text-danger px-4">{res.error}</p>;
        }

        // Filtrage précis
        const tripsToShow = res.data.filter((trip) => {
            // affiche défaut
            if (!currentUserId) return true;

            //booking utilisateur connecté
            const userBooking = trip.allBooking?.find(
                (b) => b.userInfo.idUser === currentUserId
            );

            // 3. Condition de survie du trajet dans la liste :
            // - Soit l'utilisateur est le conducteur (il doit voir son trajet même sans booking)
            // - Soit il a un booking et celui-ci n'est PAS annulé
            const isDriver = trip.driverId === currentUserId;
            const hasActiveBooking = userBooking && !userBooking.cancel;

            return isDriver || hasActiveBooking;
        });

        if (tripsToShow.length === 0) {
            return <p className="text-default-500 italic py-4">Aucun trajet à afficher.</p>;
        }

        return (
            <div className="px-4 pb-2 flex flex-col items-center gap-4 w-full">
                {tripsToShow.map((trip) => (
                    <CardTripPreview
                        key={trip.idTrip}
                        // ... tes props habituelles
                        start_city_name={trip.startingAddress.cityName}
                        arrival_city_name={trip.arrivalAddress.cityName}
                        trip_datetime={trip.tripDatetime}
                        available_seats={trip.availableSeats}
                        km={trip.km}
                        name_driver={`${trip.driverInfo.firstname} ${trip.driverInfo.lastname}`}
                        link_detail={`/your-trips/${trip.idTrip}`}
                    />
                ))}
            </div>
        );
    }
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
        <div className="min-h-screen bg-default-50 pb-30 flex flex-col items-center gap-6">
            <h1>Trajet conducteur</h1>
            {showTrips(resDriver)}

            <Divider/>

            <h1>Trajet passager</h1>
            {showTrips(resPassanger)}
        </div>
        </>
    );
}