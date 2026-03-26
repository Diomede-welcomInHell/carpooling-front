import {Button, Card, Chip} from "@heroui/react";
import Link from "next/link";
import Divider from "@/components/divider";
import {FaCalendarAlt, FaClock, FaRoad, FaUser} from "react-icons/fa";
import { TbSteeringWheelFilled } from "react-icons/tb";
import {MdEventSeat} from "react-icons/md";
import { formatDate, formatTime } from "@/utils/format-date";


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
        <Card className="w-full max-w-[420px] bg-background/80 backdrop-blur-md border border-divider shadow-md text-foreground">
            <div className="flex flex-col gap-4 pt-6 pb-4 px-6">

                {/* Départ → Arrivée */}
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Départ</p>
                        <p className="text-xl font-bold text-center text-foreground">
                            {infoTrip.start_city_name}
                        </p>
                    </div>

                    <span className="flex-shrink-0 text-default-300">
                        <svg viewBox="0 0 50 12" fill="none" className="w-12">
                            <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                            <polyline points="36,1 48,6 36,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg>
                    </span>

                    <div className="flex flex-col items-center flex-1">
                        <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Arrivée</p>
                        <p className="text-xl font-bold text-foreground text-center">
                            {infoTrip.arrival_city_name}
                        </p>
                    </div>
                </div>

                <Divider/>

                {/* Date / Heure / Places / Distance */}
                <div className="flex w-full justify-between items-start">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <FaCalendarAlt className="text-default-400 text-sm"/>
                        <p className="text-xs text-default-500">Date</p>
                        <p className="text-sm font-bold text-primary capitalize text-center">
                            {formatDate(infoTrip.trip_datetime)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-1">
                        <FaClock className="text-primary text-sm"/>
                        <p className="text-xs text-default-500">Heure</p>
                        <p className="text-lg font-bold text-primary">
                            {formatTime(infoTrip.trip_datetime)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-1">
                        <FaRoad className="text-default-400 text-sm"/>
                        <p className="text-xs text-default-500">Distance</p>
                        <p className="text-sm font-bold text-foreground">{infoTrip.km} km</p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-1">
                        <MdEventSeat className="text-sm"/>
                        <p className="text-xs text-default-500">Places</p>
                        <Chip color={infoTrip.available_seats > 0 ? "success" : "danger"} size="sm">
                            {infoTrip.available_seats > 0 ? `${infoTrip.available_seats} dispo` : "Complet"}
                        </Chip>
                    </div>
                </div>

                <Divider/>

                {/* Conducteur + Bouton */}
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TbSteeringWheelFilled className="text-default-400 text-s"/>
                        <p className="text-sm text-default-500">{infoTrip.name_driver}</p>
                    </div>
                    <Link href={infoTrip.link_detail} aria-label="Détail du trajet">
                        <Button size="sm" variant="primary">
                            Voir détail
                        </Button>
                    </Link>
                </div>

            </div>
        </Card>
    );
}