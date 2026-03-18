import {CardTripPreview} from "@/components/trip-component/card-preview-trip";

export default function AllTripsPage() {
    return (
        <CardTripPreview
            start_city_name={"Vannes"}
            arrival_city_name={"Lorient"}
            trip_datetime={"20-03-2026 14h30"}
            available_seats={3}
            km={100}
            name_driver={"Paul Hachie"}
            link_detail={"/lien/exemple"}/>
    )
}