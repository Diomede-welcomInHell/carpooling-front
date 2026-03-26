"use client";

import {Form, Accordion, Button } from "@heroui/react";
import {TripCityAutoComplete} from "@/components/trip-component/trip-city-autocomplete";
import DateSelection from "@/components/date-picker";
import { useRouter } from "next/navigation";
import {ChevronDown} from "@gravity-ui/icons";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchTrip() {
    const router = useRouter();

    function handleSearch(formData: FormData) {
        const params = new URLSearchParams();

        const startingcity = (formData.get("cityStart") as string)?.split(" ")[0];
        const arrivalcity = (formData.get("cityEnd") as string)?.split(" ")[0];
        const tripdate = formData.get("dateStart") as string;

        if (startingcity) params.append("startingcity", startingcity);
        if (arrivalcity)  params.append("arrivalcity", arrivalcity);
        if (tripdate)     params.append("tripdate", tripdate);

        router.push(`/trips?${params.toString()}`);
    }

    return  <Accordion variant="surface" className="w-[380px] mx-auto p-2 bg-background/80 backdrop-blur-md border border-divider shadow-md">
        <Accordion.Item key="search">
            <Accordion.Heading >
                <Accordion.Trigger>
                        <span className="mr-3 size-4 shrink-0 text-muted"><FaMagnifyingGlass /></span>
                    Nouvelle recherche
                    <Accordion.Indicator>
                        <ChevronDown />
                    </Accordion.Indicator>
                </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
            <Accordion.Body>
            <Form action={handleSearch} className="flex flex-col gap-6 items-center">
                <TripCityAutoComplete title={"Départ"} nameInput={"cityStart"} />
                <TripCityAutoComplete title={"Arrivée"} nameInput={"cityEnd"} />
                <DateSelection nameInput={"dateStart"} />
                <Button type="submit" className="w-full">
                    Recherche
                </Button>
            </Form>
                </Accordion.Body>
            </Accordion.Panel>
        </Accordion.Item>
    </Accordion>
}