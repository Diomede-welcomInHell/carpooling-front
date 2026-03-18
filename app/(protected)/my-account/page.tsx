import {Button} from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import { VscAccount } from "react-icons/vsc";

import { logout } from "@/lib/auth";
import {getProfil} from "@/lib/profil";
import { getCar } from "@/lib/car";
import FormProfil from "@/components/form-profil";
import CarSection from "@/components/car-component/car-section";


export default async function MyAccountPage(){
   const res = await getProfil();
    console.log("🐋🐋🐋🐋🐋 res : " + res.id_car);

    const hasCar : boolean = await res.id_car != null;
    let resCar;
    if(hasCar){
      resCar = await getCar(res.id_car);
    }
    console.log("1️⃣ récupère la voiture :" + resCar?.model);
    return  <>
    <header className="flex flex-col items-center justify-center p-8">
<VscAccount size="40px" />

<h1>Mon compte</h1>
    </header>
    <main className="flex flex-col items-center justify-center">

{/* Création du compte/ Modification du compte (récupérer les info au chargement de la page) */}
<FormProfil email={res.email} firstname={res.firstname} lastname={res.lastname} phone={res.phone} />

        <CarSection
            hasCar={hasCar}
            idCar={res.id_car}
            resCar={resCar}
        />
{/* Supprimer une voiture */}


        <Button variant="danger-soft" onClick={logout}>Deconnexion</Button>
    </main>
    </>
}