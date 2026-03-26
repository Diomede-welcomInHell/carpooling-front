'use client'

import {Button, Card} from "@heroui/react";
import Link from "next/link";
import {Envelope} from "@gravity-ui/icons";

import {FaArrowLeft} from "react-icons/fa";
import ButtonModalMessage from "@/components/button-modal-message";

import ButtonConfirmationModal from "@/components/trip-component/detail/button-confirmation-modal";


interface PropsAction {
    buttonLabel: string;
    confirmationText: string;
    tripId: number; // on passe l'id séparément
    idDest: number;
    url: string;
}

export default function TripActions({ buttonLabel, confirmationText, tripId, idDest, url }: Readonly<PropsAction>) {

    return (
        <Card className="px-2 py-2 bg-background/80 backdrop-blur-md border border-divider shadow-md">
            <div className="mx-auto max-w-md flex flew-row items-center justify-between gap-3">
                <Link href={url}><Button variant="danger"><FaArrowLeft /> Retour</Button></Link>
                <ButtonModalMessage idDest={idDest}>
                    <Button variant="secondary">
                      <Envelope/>  Contacter
                    </Button>
                </ButtonModalMessage>
                <ButtonConfirmationModal
                    buttonLabel={buttonLabel}
                    confirmationText={confirmationText}
                    tripId={tripId}

                />
            </div>
        </Card>
    );
}