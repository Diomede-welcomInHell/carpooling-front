import { FaCar, FaIdCard, FaTag } from "react-icons/fa";
import {Card} from "@heroui/react";

interface PropsCarDetail {
    brand: string;
    model: string;
    registration: string;
}

export default function TripCarCard(props: Readonly<PropsCarDetail>) {
    return (
        <Card className="w-full bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <Card.Content className="flex flex-col px-5 py-5">
                <p className="text-xs text-default-500 uppercase tracking-widest mb-4">
                    Véhicule
                </p>

                <div className="flex items-center gap-4">
                    {/* Icône principale */}
                    <div className="flex-shrink-0 bg-background rounded-full p-2 z-10">
                        <FaCar className="text-primary" size={22} />
                    </div>

                    {/* Infos */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-snug truncate">
                            {props.brand} {props.model}
                        </p>

                        {/* Plaque */}
                        <div className="flex items-center gap-1.5 mt-1">
                            <FaIdCard className="text-default-400 flex-shrink-0" size={13} />
                            <span className="text-xs font-mono tracking-widest text-default-500 uppercase">
                                {props.registration}
                            </span>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
