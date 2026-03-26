import { FaMapMarkerAlt, FaFlagCheckered, FaRoad } from "react-icons/fa";
import {Card} from "@heroui/react";

interface PropsDetail {
    cityEnd: string;
    streetEnd: string;
    codeEnd: string;
    cityStart: string;
    streetStart: string;
    codeStart: string;
    km: number;
}

export default function TripTrajetCard(props: Readonly<PropsDetail>) {
    return (
        <Card className="w-full bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <Card.Content className="flex flex-col px-5 py-5">
                <p className="text-xs text-default-500 uppercase tracking-widest mb-4">
                    Détail du trajet
                </p>

                {/* Timeline wrapper */}
                <div className="relative flex flex-col gap-0">

                    {/* Ligne verticale reliant les deux points */}
                    <div
                        className="absolute left-[9px] top-[22px] bottom-[30px] w-px bg-gray-300"
                        aria-hidden="true"
                    />

                    {/* Départ */}
                    <div className="flex items-start gap-3 pb-5">
                        <div className="flex-shrink-0 mt-0.5 z-10 bg-background rounded-full py-2">
                            <FaMapMarkerAlt className="text-primary" size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-default-500 mb-0.5">Départ</p>
                            <p className="text-sm font-semibold text-foreground leading-snug truncate">
                                {props.streetStart}
                            </p>
                            <p className="text-xs text-default-500">
                                {props.codeStart} {props.cityStart}
                            </p>
                        </div>
                    </div>

                    {/* Distance — pill centré sur la ligne */}
                    <div className="flex items-center gap-3 py-1 pl-0">
                        <div className="flex-shrink-0 mt-0.5 z-10 bg-background rounded-full py-2">
                            <FaRoad className="text-default-400" size={18} />
                        </div>
                        <span className="text-xs font-medium text-default-500 bg-default-100 rounded-full px-3 py-0.5">
                            {props.km} km
                        </span>
                    </div>

                    {/* Arrivée */}
                    <div className="flex items-start gap-3 pt-5">
                        <div className="flex-shrink-0 mt-0.5 z-10 bg-background rounded-full py-2">
                            <FaFlagCheckered className="text-primary" size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-default-500 mb-0.5">Arrivée</p>
                            <p className="text-sm font-semibold text-foreground leading-snug truncate">
                                {props.streetEnd}
                            </p>
                            <p className="text-xs text-default-500">
                                {props.codeEnd} {props.cityEnd}
                            </p>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
