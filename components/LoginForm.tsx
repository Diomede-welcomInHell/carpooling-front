'use client';

import {Button, Form, Input, Label, TextField, Card, Spinner, Alert, CloseButton} from "@heroui/react";
import {useState, useTransition} from "react";
import Link from "next/link";
import {login} from "@/lib/auth";

export default function LoginFrom ({flash} : {flash? : string}) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            setError(null)
            const result = await login(formData)
            if (result?.error) {
                setError(result.error)
            }
        })
    }

        return (
            <>
                {flash && (
                    <Alert status="success">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>{flash}</Alert.Title>
                        </Alert.Content>
                        <CloseButton />
                    </Alert>
                )}
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md p-0 shadow">
                    <Card.Header className="bg-blue-500  p-4">
                        <Card.Title className="text-lg text-white">Authentification</Card.Title>
                    </Card.Header>

                    <Form action={handleSubmit} className="p-4">
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
                                    <Input placeholder="email@example.com" variant="secondary"/>
                                </TextField>
                                <TextField name="password" type="password"
                                           validate={(value) => {
                                               if (value.length < 3) {
                                                   return "Le mot de passe doit avoir au moins 3 charactères";
                                               }
                                               return null;}}
                                >
                                    <Label className="text-black">Mot de passe</Label>
                                    <Input placeholder="••••••••" variant="secondary"/>
                                </TextField>
                            </div>
                        </Card.Content>
                        <Card.Footer className="mt-4 flex flex-col gap-2">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}
                            <Button className="w-full" type="submit" isDisabled={isLoading}>
                                {isLoading ? "Connexion... " : "Se connecter" }
                            </Button>
                            <Link href="/register" className="w-full"><Button className="w-full border-blue-500"
                                                                              variant="outline">S&apos;inscrire</Button></Link>
                        </Card.Footer>
                    </Form>
                    {isLoading && (<div className="flex flex-col items-center gap-2">
                        <Spinner size="xl" />
                        <span className="text-xs text-muted">Connexion...</span>
                    </div>)}
                </Card>
            </div>
            </>
        );
}