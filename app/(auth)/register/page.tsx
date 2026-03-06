"use client";
import {GoArrowLeft} from "react-icons/go";
import {Button, Form, Input, Label, TextField, Card, Spinner} from "@heroui/react";
import {useActionState, useState} from "react";
import Link from "next/link";

import { register } from "@/lib/register";

export default function RegisterPage() {

    const [state, formAction, isLoading] = useActionState(register, null);
    const [email, setEmail] = useState(state?.fields?.email ?? "");

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md p-0 shadow">
                <Card.Header className="bg-blue-500  p-4">
                    <Card.Title className="text-lg text-white flex flex-row">
                        <Link href="/login"><GoArrowLeft/></Link>
                        Inscription
                    </Card.Title>
                </Card.Header>

                <Form action={formAction} className="p-4">
                    <Card.Content>
                        <div className="flex flex-col gap-4">
                            <TextField name="email" type="email"
                                       validate={(value) => {
                                           if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                               return "Please enter a valid email address";
                                           }
                                           return null;
                                       }}
                            >
                                <Label className="text-black">Email</Label>
                                <Input placeholder="email@example.com" variant="secondary"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </TextField>
                            <TextField name="password" type="password"
                                       validate={(value) => {
                                           if (value.length < 3) {
                                               return "Password must be at least 8 characters";
                                           }
                                           return null;
                                       }}
                            >
                                <Label className="text-black">Mot de passe</Label>
                                <Input placeholder="••••••••" variant="secondary"
                                />
                            </TextField>
                            <TextField name="confPassword" type="password"
                                       validate={(value) => {
                                           if (value.length < 3) {
                                               return "Password must be at least 8 characters";
                                           }
                                           return null;
                                       }}
                            >
                                <Label className="text-black">Confirmation du mot de passe</Label>
                                <Input placeholder="••••••••" variant="secondary"/>
                            </TextField>
                        </div>
                    </Card.Content>
                    <Card.Footer className="mt-4 flex flex-col gap-2">
                        {state?.error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                <p className="text-red-600 text-sm">{state?.error}</p>
                            </div>
                        )}
                        <Button className="w-full" type="submit" isDisabled={isLoading}>
                            Valider l&apos;inscription
                        </Button>
                        <Link href="/login" className="w-full"><Button className="w-full border-blue-500"
                                                                          variant="outline">Annuler</Button></Link>
                    </Card.Footer>
                </Form>
                {isLoading && (<div className="flex flex-col items-center gap-2">
                    <Spinner size="xl" />
                    <span className="text-xs text-muted">Création du compte</span>
                </div>)}
            </Card>
        </div>
    );
}