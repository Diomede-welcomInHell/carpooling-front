import {Avatar, Card} from "@heroui/react";
import {FaCar, FaFlagCheckered, FaMapMarkerAlt, FaRoad, FaUser} from "react-icons/fa";

interface PropsDetail {
    cityEnd: string,
    streetEnd: string,
    codeEnd: string,
    cityStart: string,
    streetStart: string,
    codeStart: string,
    km:number,
    carBrand:string,
    carModel:string,
    driverFirstName: string,
    driverLastName: string,

}


export default function TripDetailCard(props: Readonly<PropsDetail>) {
    return (
        <Card className="shadow-md">
            <Card.Description className="flex flex-col gap-4 px-5 py-5">
                <p className="text-xs text-default-500 uppercase tracking-widest">Détail du trajet</p>

                {/* Adresse départ */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-default-500">Adresse de départ</p>
                        <p className="text-sm font-medium text-black">
                            {props.streetStart}
                        </p>
                        <p className="text-xs text-default-500">
                            {props.codeStart} {props.cityStart}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-300 my-4"></div>

                {/* Adresse arrivée */}
                <div className="flex items-start gap-3">
                    <FaFlagCheckered className="textarea--primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-default-500">Adresse d&apos;arrivée</p>
                        <p className="text-sm font-medium text-black">
                            {props.streetEnd}
                        </p>
                        <p className="text-xs text-default-500">
                            {props.codeEnd} {props.cityEnd}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-300 my-4"></div>

                {/* Distance */}
                <div className="flex items-center gap-3">
                    <FaRoad className="text-default-400 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-default-500">Distance</p>
                        <p className="text-sm font-medium text-black">{props.km} km</p>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-300 my-4"></div>

                {/* Véhicule */}
                <div className="flex items-center gap-3">
                    <FaCar className="text-default-400 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-default-500">Véhicule</p>
                        <p className="text-sm font-medium text-black">
                            {props.carBrand} {props.carModel}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-300 my-4"></div>

                {/* Conducteur */}
                <div className="flex items-center gap-3">
                    <FaUser className="text-default-400 flex-shrink-0" />
                    <div className="flex items-center gap-3">
                        {/*<Avatar name={initials} size="sm" color="primary" />*/}
                        <div>
                            <p className="text-xs text-default-500">Conducteur</p>
                            <p className="text-sm font-medium text-black">
                                {props.driverFirstName} {props.driverLastName}
                            </p>
                        </div>
                    </div>
                </div>
            </Card.Description>
        </Card>
    )
}