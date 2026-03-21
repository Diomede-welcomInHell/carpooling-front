"use client";
import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { useActionState, useState} from "react";

import {addCar, updateCar} from "@/lib/car";
import {CarBrandAutoComplete} from "@/components/car-component/car-brand-autocomplete";

interface FormCarProps {
    id?: number;
    model? : string;
    brand? : string;
    seats? : number;
    carRegistration? : string;
    onCancel?: () => void;
}

export default function FromCar(car : FormCarProps = {}) {
    const isCreated : boolean = Boolean(car?.id);
    const action = isCreated ? updateCar : addCar ;
    const [state, formAction, isLoading] = useActionState( action, null);

    const [id, setId] = useState(car.id ?? state?.id ?? 0);
    const [model, setModel] = useState(car.model ?? state?.model ?? "");
    const [brand, setBrand] = useState(car.brand ?? state?.brand ?? "");
    const [seats, setSeats] = useState(car.seats ?? state?.seats ?? 1);
    const [carRegistration, setCarRegistration] = useState(car.carRegistration ?? state?.carRegistration ?? "");

    return <div className="flex flex-col items-center justify-center my-8">
        <h2>Information voiture</h2>

        <Form action={formAction} className="p-2">
            <input type="hidden" name="id" value={id} onChange={(e) => setId(e.target.value)}/>
            <div className="flex flex-col gap-4">
                <TextField name="model" type="text">
                    <Label>Model</Label>
                    <Input placeholder="" variant="secondary"
                           value={model}
                           onChange={(e) => setModel(e.target.value)}
                    />
                </TextField>

                {/* Ajouter le composant de séléection de voiture*/}
                <CarBrandAutoComplete defaultValue={brand} onChange={setBrand}/>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="input-type-number">Nombre de sièges</Label>
                    <Input id="input-type-number" min={0} max={10} type="number"
                           name="seats"
                    value={seats}
                           onChange={(e) => setSeats(e.target.value)}
                    />
                </div>
                <TextField type="text">
                    <Label>Plaque d&apos;imatriculation</Label>
                    <Input placeholder="AA-000-AA"
                           name="carRegistration"
                    type="text"
                    value={carRegistration}
                    onChange={(e) => setCarRegistration(e.target.value)}
                    />
                </TextField>
            </div>
            {state?.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <p className="text-red-600 text-sm">{state?.error}</p>
                </div>
            )}
            <Button className="w-full mt-8 mb-2" type="submit" isDisabled={isLoading}>
                {isCreated ? "Modifier" : "Enregistrer" }
            </Button>
        </Form>
            {car.onCancel ? (
            <Button className="w-full border-blue-500"
                    variant="outline"
                    onClick={car.onCancel}>
                Annuler
            </Button>
            ) :
                <Button className="w-full border-blue-500"
                        variant="outline"
                        //onClick={car.onCancel}
                    >
                    Supprimer
                </Button>
            }

        {isLoading && (<div className="flex flex-col items-center gap-2">
            <Spinner size="xl"/>
            <span className="text-xs text-muted">Modification du véhicule</span>
        </div>)}
    </div>
}