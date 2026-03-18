"use client";
import { useState } from "react";
import { Plus } from "@gravity-ui/icons";
import {Button} from "@heroui/react";
import FromCar from "./form-car";

interface CarSectionProps {
    hasCar: boolean;
    idCar?: number;
    resCar?: {
        model?: string;
        brand?: string;
        registration?: string;
        seats?: number;
    };
}

export default function CarSection({ hasCar, idCar, resCar }: CarSectionProps) {

    console.log("2️⃣ récupère la voiture :" + resCar?.model);
    // Si l'utilisateur a déjà une voiture, on affiche directement le formulaire
    const [showForm, setShowForm] = useState(hasCar);


    if (!hasCar && !showForm) {
        return (
            <Button variant="secondary" onClick={() => setShowForm(true)} className="my-4" >
                <Plus />
                Ajouter une voiture
            </Button>
        );
    }

    return (
        <FromCar
            id={idCar}
            model={resCar?.model}
            brand={resCar?.brand}
            carRegistration={resCar?.registration}
            seats={resCar?.seats}
            onCancel={!hasCar ? () => setShowForm(false) : undefined}
        />
    );
}