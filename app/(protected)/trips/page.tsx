import {CardTripPreview} from "@/components/trip-component/card-preview-trip";
import {getTripsFilter} from "@/lib/trip";
import {Trip} from "@/config/zodSchema";

export default async function AllTripsPage() {
    const res = await getTripsFilter()

    if (!res.success) {
        return <p>Erreur : {res.error}</p>
    }

if(res.success) {
    return (
        <div>
            {res.data.map((trip: Trip) => (
                <CardTripPreview
                    key={trip.idTrip}
                    start_city_name={trip.starting_address.city_name}
                    arrival_city_name={trip.arrival_address.city_name}
                    trip_datetime={trip.trip_datetime}
                    available_seats={trip.available_seats}
                    km={trip.km}
                    name_driver={`${trip.driver.firstname} ${trip.driver.lastname}`}
                    link_detail={`/trips/${trip.idTrip}`}
                />
            ))}
        </div>
    )
}
}