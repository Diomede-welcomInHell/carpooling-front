"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import {ReactNode, useTransition} from "react";
import {deleteTripAsDriver, testTrip} from "@/lib/trip";
import {cancelBooking} from "@/lib/booking";


interface PropsCancelModal {

    children: ReactNode;
    idBooking : number;
    name:string;
}

export default function CancelModal({children, idBooking, name}: Readonly<PropsCancelModal>,) {

    const cancel = () => cancelBooking(idBooking);

return (
    <div className="flex flex-wrap gap-4">
        <Modal key="xs">
            {children}
            <Modal.Backdrop>
                <Modal.Container placement="center" size="xs">
                    <Modal.Dialog className="bg-background/80 backdrop-blur-md border border-divider shadow-md">
                        <Modal.CloseTrigger/>
                        <Modal.Header>
                            <Modal.Icon className="bg-background/80 text-foreground">
                                <Rocket className="size-5"/>
                            </Modal.Icon>
                            <Modal.Heading>
                                Souhaitez vous bannir {name} de votre trajet ?
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Si vous souhaitez confirmer votre action appuyer sur &quot;Oui&quot;.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Quitter
                            </Button>
                            <Button slot="close" onPress={cancel}>Oui</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    </div>
);
}