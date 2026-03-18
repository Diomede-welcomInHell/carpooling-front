"use client";
import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { useActionState, useState } from "react";
import Link from "next/link";

import { addProfil, updateProfil } from "@/lib/profil";

interface FormProfilProps {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
}

//Gérer le cas de la création et de la modification
export default function FormProfil(formProfilProps : Readonly<FormProfilProps>) {

    const isCreated : boolean = Boolean(formProfilProps.email && formProfilProps.firstname);
    const action = isCreated ? updateProfil : addProfil;
    const [state, formAction, isLoading] = useActionState(action, null);

    const [firstname, setFirstname] = useState(formProfilProps.firstname ?? state?.firstname ?? "");
    const [lastname,  setLastname]  = useState(formProfilProps.lastname  ?? state?.lastname  ?? "");
    const [phone,     setPhone]     = useState(formProfilProps.phone     ?? state?.phone     ?? "");

    return (
        <>
            <h2>Profil</h2>

            <Form action={formAction} className="p-2">
                <div className="flex flex-col gap-4">
                    <TextField name="email" type="email">
                        <Label>Email</Label>
                        <Input placeholder="email@example.com" variant="secondary"
                            value={formProfilProps.email}
                            readOnly
                        />
                    </TextField>
                    <TextField className="w-full max-w-64" name="firstname">
                        <Label>Prénom</Label>
                        <Input placeholder="Entrer votre prénom" type="text" value={firstname}
                               onChange={(e) => setFirstname(e.target.value)}/>
                    </TextField>
                    <TextField className="w-full max-w-64" name="lastname">
                        <Label>Nom</Label>
                        <Input placeholder="Entrer votre nom" type="text" value={lastname}
                               onChange={(e) => setLastname(e.target.value)}/>
                    </TextField>
                    <TextField name="phone" type="tel">
                        <Label>Téléphone</Label>
                        <Input placeholder="06 00 00 00 00"  value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </TextField>
                </div>
                {state?.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-red-600 text-sm">{state?.error}</p>
                    </div>
                )}
                <Button className="w-full mt-8 mb-2" type="submit" isDisabled={isLoading}>
                    {isCreated ? "Modifier votre profil" : "Créer un profil"}
                </Button>
               <Button className="w-full border-blue-500"
                    variant="outline">Annuler</Button>
            </Form>
            {isLoading && (<div className="flex flex-col items-center gap-2">
                <Spinner size="xl" />
                <span className="text-xs text-muted">Modification du profil</span>
            </div>)}
        </>
    );
}