import {CardTripPreview} from "@/components/trip-component/card-preview-trip";
import {getTripsFilter} from "@/lib/trip";
import {Trip} from "@/config/zodSchema";
import SearchTrip from "@/components/trip-component/search-trip";


export default async function TripsPage({searchParams,}: {
    searchParams: Promise<{ startingcity?: string; arrivalcity?: string; tripdate?: string }>;
}) {

    const {startingcity, arrivalcity, tripdate} = await searchParams;

    const res = await getTripsFilter({startingcity, arrivalcity, tripdate})

    return (
        <div className="min-h-screen bg-default-50 pb-30 flex flex-col items-center">

            {/* ── Barre de recherche : sous la navbar desktop (top-16), en haut sur mobile ── */}
            <div className="fixed top-8 md:top-25 left-0 right-0 z-20 px-4">
                <div className="max-w-2xl mx-auto">
                <SearchTrip/>
                </div>
            </div>

            {/* ── Liste scrollable avec margin pour passer sous l'accordéon ── */}
            <div className="mt-32 md:mt-40 px-4 pb-24 md:pb-2 flex flex-col items-center gap-4">
                {res.success ? (
                    res.data
                        .filter((trip: Trip) => {
                            const tripDate = new Date(trip.tripDatetime);
                            return tripDate > new Date() && trip.availableSeats > 0;
                        })
                        .sort((a: Trip, b: Trip) => {
                            return new Date(a.tripDatetime).getTime() - new Date(b.tripDatetime).getTime();
                        })
                        .map((trip: Trip) => (
                        <CardTripPreview
                            key={trip.idTrip}
                            start_city_name={trip.startingAddress.cityName}
                            arrival_city_name={trip.arrivalAddress.cityName}
                            trip_datetime={trip.tripDatetime}
                            available_seats={trip.availableSeats}
                            km={trip.km}
                            name_driver={`${trip.driver.firstname} ${trip.driver.lastname}`}
                            link_detail={`/trips/${trip.idTrip}`}
                        />
                    ))
                ) : (
                    <p className="text-danger">{res.error}</p>
                )}
            </div>

        </div>
    );
}