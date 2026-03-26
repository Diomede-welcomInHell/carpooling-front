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
            const userBooking = trip.all_booking?.find(
                (b) => b.user_info.idUser === currentUserId
            );

            // 3. Condition de survie du trajet dans la liste :
            // - Soit l'utilisateur est le conducteur (il doit voir son trajet même sans booking)
            // - Soit il a un booking et celui-ci n'est PAS annulé
            const isDriver = trip.driver_id === currentUserId;
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
                        key={trip.id_trip}
                        // ... tes props habituelles
                        start_city_name={trip.starting_address.city_name}
                        arrival_city_name={trip.arrival_address.city_name}
                        trip_datetime={trip.trip_datetime}
                        available_seats={trip.available_seats}
                        km={trip.km}
                        name_driver={`${trip.driver_info.firstname} ${trip.driver_info.lastname}`}
                        link_detail={`/your-trips/${trip.id_trip}`}
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