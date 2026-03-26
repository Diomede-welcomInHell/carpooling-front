'use client'

import {Button, Card} from "@heroui/react";
import Link from "next/link";

import {FaArrowLeft} from "react-icons/fa";

import ButtonConfirmationModal from "@/components/trip-component/detail/button-confirmation-modal";


interface PropsAction {
    buttonLabel: string;
    confirmationText: string;
    tripId: number; // on passe l'id séparément
}

export default function TripActionsDriver({ buttonLabel, confirmationText, tripId }: Readonly<PropsAction>) {

    return (
        <Card className="px-2 py-2 bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <div className="w-full mx-auto max-w-md flex flew-row items-center justify-between gap-3">
                <Link href="/your-trips"><Button variant="danger"><FaArrowLeft /> Retour</Button></Link>
                <ButtonConfirmationModal
                    buttonLabel={buttonLabel}
                    confirmationText={confirmationText}
                    tripId={tripId}
                />
            </div>
        </Card>
    );
}