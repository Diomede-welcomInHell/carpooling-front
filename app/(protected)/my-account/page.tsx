import {Button, Form, Input, Label, TextField, Card, Spinner} from "@heroui/react";
import { VscAccount } from "react-icons/vsc";

import { logout } from "@/lib/auth";
import FormProfil from "@/components/form-profil";


export default function MyAccountPage(){
    return  <>
    <header className="flex flex-col items-center justify-center p-8">
<VscAccount size="40px" />

<h1>Mon compte</h1>
    </header>
    <main>

{/* Création du compte/ Modification du compte (récupérer les info au chargement de la page) */}
<FormProfil/>



{/* Ajout d'une voiture */}
 
{/* Modifier une voiture */}
{/* Supprimer une voiture */}


        <Button variant="danger-soft" onClick={logout}>Deconnexion</Button>
    </main>
    </>
}