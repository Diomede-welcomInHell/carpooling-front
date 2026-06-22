'use client'
import {Booking} from "@/config/zodSchema";
import {Button, Card} from "@heroui/react";
import { VscAccount } from "react-icons/vsc";
import {FaEnvelope, FaPhone, FaBan } from "react-icons/fa";
import Link from "next/link";
import ButtonModalMessage from "@/components/button-modal-message";
import CancelModal from "@/components/trip-component/detail/trip-cancel-modal";

interface PropsListPassager {
    idUser: number;
    isDriver: boolean;
    bookings? : Array<Booking>;
}

export default function TripPassagerCard({idUser, isDriver, bookings}: PropsListPassager) {
    const activeBookings = bookings?.filter(booking => !booking.cancel) || [];
    return (
        <Card className="w-full bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <Card.Content className="flex flex-col px-5 pt-5">
                <p className="text-xs text-default-500 uppercase tracking-widest mb-4">
                    Passagers
                </p>

                {activeBookings.length === 0 ? (
                    <div>Aucun passager</div>
                ) : (
                    activeBookings.map((booking, index) => {
                        const passager = booking.userInfo;

                        return (
                            <div key={passager.idUser ?? passager.idPerson} className="flex flex-col">
                                {index > 0 && (
                                    <div className="w-full h-px bg-gray-300 my-4"/>
                                )}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 bg-background rounded-full p-2 z-10">
                                        <VscAccount className="text-primary" size={26}/>
                                    </div>

                                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-foreground leading-snug truncate">
                                            {passager.firstname} {passager.lastname}
                                        </p>

                                        <div className="flex items-center gap-1.5">
                                            <FaEnvelope className="text-default-400 flex-shrink-0" size={11}/>
                                            <span className="text-xs text-default-500 truncate">{passager.email}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <FaPhone className="text-default-400 flex-shrink-0" size={11}/>
                                            <span className="text-xs text-default-500">{passager.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {isDriver ? (
                                    <div className="my-3 w-full flex flex-row justify-end gap-2 flex-shrink-0">
                                        <ButtonModalMessage idDest={passager.idUser!}>
                                        <Button isIconOnly variant="outline" aria-label="Envoyer un mail">
                                            <FaEnvelope size={14} className="text-foreground"/>
                                        </Button>
                                        </ButtonModalMessage>
                                        <Link href={`tel:${passager.phone}`}>
                                            <Button isIconOnly variant="outline" aria-label="Appeler">
                                                <FaPhone size={14} className="text-foreground"/>
                                            </Button>
                                        </Link>
                                        <CancelModal idBooking={booking.idBooking} name={`${passager.firstname} ${passager.lastname}`}>
                                            <Button isIconOnly variant="outline" aria-label="Bannir un passager">
                                                <FaBan  size={14} className="text-foreground"/>
                                            </Button>
                                        </CancelModal>
                                    </div>
                                ) : (
                                    <div className="my-2"/>
                                )}
                            </div>
                        );
                    })
                )}

            </Card.Content>
        </Card>
    )
}