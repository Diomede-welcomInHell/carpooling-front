import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import FormAddTrip from "@/components/trip-component/form-add-trip";
import { FaCarOn } from "react-icons/fa6";

export default function NewTripPage() {
    return(
<>
    <header className="flex flex-col items-center justify-center p-8">
        <FaCarOn size="40px" className="m-2"/>

        <h1>Créer un trajet</h1>
    </header>
<FormAddTrip/>
</>
    )
}