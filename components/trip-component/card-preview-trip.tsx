import {Button, Card, Link} from "@heroui/react";

import {FaLongArrowAltRight} from "react-icons/fa";

interface CardTripPreviewProps {
    start_city_name: string;
    arrival_city_name: string;
    trip_datetime: string;
    available_seats: number;
    km: number;
    name_driver: string;
    link_detail: string;

}


export function CardTripPreview(infoTrip: Readonly<CardTripPreviewProps>) {
    return (
        <Card className="w-[400px]">

            <Card.Header>
                <Card.Title className="flex flex-row text-gray-600">
                   <span className="flex items-center gap-2 text-2xl text-gray-600">
  {infoTrip.start_city_name}
                       <span className="flex items-center text-gray-400">
    <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
      <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <polyline points="28,1 38,6 28,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  </span>
                       {infoTrip.arrival_city_name}
</span>
                </Card.Title>
                <Card.Description>
                    <ul>
                        <li>Places restantes : {infoTrip.available_seats}</li>
                        <li>Départ : {infoTrip.trip_datetime}</li>
                        <li>Distance : {infoTrip.km}</li>
                        <li>Conducteur : {infoTrip.name_driver}</li>
                    </ul>
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Link
                    aria-label="Détail du trajet"
                    href={infoTrip.link_detail}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Button>
                        Voir détail
                    </Button>
                    <Link.Icon aria-hidden="true"/>
                </Link>
            </Card.Footer>
        </Card>
    );
}