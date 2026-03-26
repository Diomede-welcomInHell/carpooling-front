'use client'
import {Button, Modal, TextArea} from "@heroui/react";
import {Envelope} from "@gravity-ui/icons";
import {sendEmail} from "@/lib/booking";
import {ReactNode, useState, useTransition} from "react";


interface ButtonModalMessageProps {
    idDest: number;
    children: ReactNode; // C'est ici qu'on définit le bouton déclencheur
}

export default function ButtonModalMessage({ idDest, children }: ButtonModalMessageProps) {
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSend = () => {
        if (!message.trim()) return;

        startTransition(async () => {
            try {
                await sendEmail(idDest, message);
                console.log("Email envoyé !");
                setMessage(""); // On vide le champ après succès
                // Tu pourrais aussi fermer la modal ici si tu as un contrôle sur son état
            } catch (error) {
                console.error("Erreur lors de l'envoi :", error);
            }
        });
    };

    return (
        <div className="flex flex-wrap gap-4">
                <Modal key="center">
                    {children}
                    {/*<Button variant="secondary">*/}
                    {/*  <Envelope/>  Contacter*/}
                    {/*</Button>*/}
                    <Modal.Backdrop>
                        <Modal.Container placement="center">
                            <Modal.Dialog className="bg-background/80 backdrop-blur-md border border-divider shadow-md">
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Modal.Icon className="bg-background/30 text-foreground">
                                        <Envelope className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading>
                                        Envoyer un message
                                    </Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="flex flex-col gap-2">
                                        <TextArea
                                            aria-label="Message"
                                            placeholder="Écrivez votre message ici..."
                                            rows={6}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            style={{ resize: "vertical" }}
                                        />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="w-full"
                                            slot="close"
                                            onPress={handleSend}>
                                        Envoyer
                                    </Button>

                                    <Button variant="secondary" className="w-full" slot="close">
                                        Annuler
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>

        </div>
    );
}
