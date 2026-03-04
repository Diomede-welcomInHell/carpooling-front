"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, Card} from "@heroui/react";
import {login} from '@/lib/auth';
import {useState} from "react";
import Link from "next/link";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    };

    return (
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
                                           if (value.length < 8) {
                                               return "Password must be at least 8 characters";
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
                        <Button className="w-full" type="submit">
                            Se connecter
                        </Button>
                        <Link href="/register" className="w-full"><Button className="w-full border-blue-500"
                                                                          variant="outline">S&apos;inscrire</Button></Link>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    );
}