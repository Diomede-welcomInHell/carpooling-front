'use client'

import {Card, CardHeader, Chip} from "@heroui/react";
import {FaCalendarAlt, FaClock} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";

interface PropsResum {
    cityEnd: string,
    cityStart: string,
    datetime: string,
    available_seats:number

}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function TripResumCard(props: PropsResum) {
    return (
        <Card className="shadow-md text-black">
            <CardHeader className="flex flex-col items-center gap-4 pt-6 pb-4 px-6">

                {/* Départ → Arrivée */}
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Départ</p>
                        <p className="text-xl font-bold text-center text-black">
                            {props.cityStart}
                        </p>
                    </div>

                    <span className="flex-shrink-0 text-default-300">
                                <svg viewBox="0 0 50 12" fill="none" className="w-12">
                                    <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                    <polyline points="36,1 48,6 36,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </span>

                    <div className="flex flex-col items-center flex-1">
                        <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Arrivée</p>
                        <p className="text-xl font-bold text-black text-center">
                            {props.cityEnd}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-300 my-4"></div>

                {/* Date / Heure / Places */}
                <div className="flex w-full justify-between items-start">
                    <div className="flex flex-col items-center gap-1 flex-3">
                        <FaCalendarAlt className="text-default-400 text-sm" />
                        <p className="text-xs text-default-500">Date</p>
                        <p className="text-sm font-bold text-primary capitalize text-center">
                            {formatDate(props.datetime)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-2">
                        <FaClock className="text-primary text-sm" />
                        <p className="text-xs text-default-500">Heure</p>
                        <p className="text-lg font-bold text-primary">
                            {formatTime(props.datetime)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-2">
                        <MdEventSeat />
                        <p className="text-xs text-default-500">Places</p>
                        <Chip
                            color={props.available_seats > 0 ? "success" : "danger"}
                            size="sm"
                        >
                            {props.available_seats > 0
                                ? `${props.available_seats} dispo`
                                : "Complet"}
                        </Chip>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}