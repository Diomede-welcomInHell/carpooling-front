'use client'
import {FaUser, FaEnvelope, FaPhone, FaCar} from "react-icons/fa";
import { TbSteeringWheelFilled } from "react-icons/tb";
import {Avatar, Card} from "@heroui/react";
import {Person} from "@gravity-ui/icons";
import {Button} from "@heroui/react";
import Link from "next/link";
import ButtonModalMessage from "@/components/button-modal-message";

interface PropsDriverDetail {
    isPassager: boolean;
    idUser: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

export default function TripDriverCard(props: Readonly<PropsDriverDetail>) {


    const handleSendMail = () => {
        console.log(props.idUser);
    };

    return (
        <Card className="w-full bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <Card.Content className="flex flex-col px-5 pt-5">
                <p className="text-xs text-default-500 uppercase tracking-widest mb-4">
                    Conducteur
                </p>

                <div className="flex items-center gap-4">
                    {/* Avatar initiales */}

                    <div className="flex-shrink-0 bg-background rounded-full p-2 z-10">
                        <TbSteeringWheelFilled className="text-primary" size={26} />
                    </div>

                        {/* Nom + infos */}
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground leading-snug truncate">
                            {props.firstname} {props.lastname}
                        </p>

                        <div className="flex items-center gap-1.5">
                            <FaEnvelope className="text-default-400 flex-shrink-0" size={11}/>
                            <span className="text-xs text-default-500 truncate">{props.email}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <FaPhone className="text-default-400 flex-shrink-0" size={11}/>
                            <span className="text-xs text-default-500">{props.phone}</span>
                        </div>
                    </div>

                    {/* Actions */}
                </div>
                {props.isPassager ?
                    (<div className="my-3 w-full flex flex-row justify-end gap-2 flex-shrink-0">
                        <ButtonModalMessage idDest={props.idUser}>
                        <Button
                            isIconOnly
                            variant="outline"
                            aria-label="Envoyer un mail"
                        >
                            <FaEnvelope size={14} className="text-foreground"/>
                        </Button>
                    </ButtonModalMessage>
                        <Link href={`tel:${props.phone}`}>
                            <Button
                                isIconOnly
                                variant="outline"
                                aria-label="Appeler"
                            >
                                <FaPhone size={14} className="text-foreground"/>
                            </Button>
                        </Link>
                    </div>) : (<div className="my-2"></div>) }
            </Card.Content>
        </Card>
    );
}
