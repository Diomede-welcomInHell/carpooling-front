"use client";
import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { useActionState, } from "react";
import Link from "next/link";

export default function FromCar(){
    const [state, formAction, isLoading] = useActionState(, null);
    return <>
    <div className="flex flex-col items-center justify-center">
            <h2>Profil</h2>

            <Form action={} className="p-2">
                <div className="flex flex-col gap-4">
                    <TextField name="email" type="email"                    >
                        <Label>Email</Label>
                        <Input placeholder="email@example.com" variant="secondary"
                            value="value mail"
                            readOnly
                        />
                    </TextField>
                    <TextField className="w-full max-w-64" name="firstname">
                        <Label>Prénom</Label>
                        <Input placeholder="Entrer votre prénom" type="text"/>
                    </TextField>
                    <TextField className="w-full max-w-64" name="lastname">
                        <Label>Nom</Label>
                        <Input placeholder="Entrer votre nom" type="text"/>
                    </TextField>
                    <TextField name="phone" type="tel">
                        <Label>Téléphone</Label>
                        <Input placeholder="06 00 00 00 00" />
                    </TextField>
                </div>
                {state?.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-red-600 text-sm">{state?.error}</p>
                    </div>
                )}
                <Button className="w-full mt-8 mb-2" type="submit" isDisabled={isLoading}>
                    Modifier
                </Button>
                <Link href="/login" className="w-full"><Button className="w-full border-blue-500"
                    variant="outline">Annuler</Button></Link>
            </Form>
            {isLoading && (<div className="flex flex-col items-center gap-2">
                <Spinner size="xl" />
                <span className="text-xs text-muted">Modification du profil</span>
            </div>)}
        </div>
    </>
}