"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import {useTransition} from "react";
import {deleteTripAsDriver, testTrip} from "@/lib/trip";
import {booking, cancelBooking} from "@/lib/booking";

interface PropsAction {
    buttonLabel: string;
    confirmationText: string;
    tripId: number; // on passe l'id séparément
}

export default function ButtonConfirmationModal({
                                                    buttonLabel,
                                                    confirmationText,
                                                    tripId
                                                }: Readonly<PropsAction>) {


    const [isPending, startTransition] = useTransition();

    const handleConfirm = () => {
        startTransition(async () => {
            switch (buttonLabel) {
                case "Annuler":
                    await cancelBooking(tripId);
                    break;
                case "Réserver":
                    await booking(String(tripId));
                    break;
                case "Supprimer":
                    await deleteTripAsDriver(String(tripId));
                    break;
                default:
                    await testTrip(tripId);
            }
        });
    };


    return (
        <div className="flex flex-wrap gap-4">
            <Modal key="xs">
                <Button>{buttonLabel}</Button>
                <Modal.Backdrop>
                    <Modal.Container placement="center" size="xs">
                        <Modal.Dialog className="bg-background/80 backdrop-blur-md border border-divider shadow-md">
                            <Modal.CloseTrigger/>
                            <Modal.Header>
                                <Modal.Icon className="bg-background/80 text-foreground">
                                    <Rocket className="size-5"/>
                                </Modal.Icon>
                                <Modal.Heading>
                                    Confirmez-vous votre {confirmationText} ?
                                </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Si vous souhaitez confirmer votre {confirmationText} appuyer sur &quot;Oui&quot;.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">
                                    Quitter
                                </Button>
                                <Button slot="close" onPress={handleConfirm}>Oui</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}