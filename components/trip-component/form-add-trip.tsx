"use client";
import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    Spinner,
    TimeField,
    DateField,
    Calendar,
    DatePicker,
    I18nProvider
} from "@heroui/react";
import { useActionState, useState } from "react";

import { addTrip} from "@/lib/trip";
import {CarBrandAutoComplete} from "@/components/car-component/car-brand-autocomplete";
import {Clock} from "@gravity-ui/icons";
import {TripCityAutoComplete} from "@/components/trip-component/trip-city-autocomplete";
import {CalendarDate, getLocalTimeZone, parseDate, today} from "@internationalized/date";


export default function FormAddTrip() {
    const [state, formAction, isLoading] = useActionState( addTrip, null);
    const [date, setDate] = useState(today(getLocalTimeZone()));


    return (
        <div className="flex flex-col items-center justify-center">

            <Form action={formAction} className="p-2">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-number">Nombre de siège disponible</Label>
                        <Input id="seats"
                               name="available_seats"
                               min={0} max={10} placeholder="4"
                               type="number"
                               defaultValue={Number(state?.fields?.available_seats ?? 4)}
                        />
                    </div>
                    <I18nProvider locale="fr-FR">
                    <TimeField className="w-[256px]" name="time">
                        <Label>Time</Label>
                        <TimeField.Group>
                            <TimeField.Prefix>
                                <Clock className="size-4 text-muted" />
                            </TimeField.Prefix>
                            <TimeField.Input>{(segment) => {
                                return <TimeField.Segment segment={segment}/>
                            }
                            }</TimeField.Input>
                        </TimeField.Group>
                    </TimeField>


                    </I18nProvider>
                    <DatePicker className="w-64"
                                defaultValue={
                                    state?.fields?.date
                                        ? parseDate(String(state?.fields?.date))
                                        : today(getLocalTimeZone())
                                }
                                name="date"
                    >
                        <Label>Date</Label>
                        <DateField.Group fullWidth>
                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({year}) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>

                    <TripCityAutoComplete title="Ville de départ" nameInput="starting_city"/>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="name">Indiquer le lieu de départ</Label>
                        <Input className="w-64"
                               id="street_name_start"
                               name="street_name_start"
                               defaultValue={String(state?.fields?.street_name_start ?? "1 place de la République")}
                               placeholder=""
                               type="text"
                        />
                    </div>
                    <TripCityAutoComplete title="Arrivée" nameInput="end_city"/>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="name">Indiquer le lieu d&#39;arrivée</Label>
                        <Input className="w-64"
                               id="street_name_end"
                               name="street_name_end"
                               defaultValue={String(state?.fields?.street_name_end ?? "1 place de la République")}
                               placeholder=""
                               type="text"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-number">Km</Label>
                        <Input id="km"
                               name="km"
                               min={0}
                               max={10000}
                               defaultValue={Number(state?.fields?.km ?? 50)}
                               placeholder="50 km"
                               type="number" />
                    </div>

                </div>
                {state?.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-red-600 text-sm">{state?.error}</p>
                    </div>
                )}
                <Button className="w-full mt-8 mb-2" type="submit" isDisabled={isLoading}>
                    Créer
                </Button>
            </Form>


            {isLoading && (<div className="flex flex-col items-center gap-2">
                <Spinner size="xl"/>
                <span className="text-xs text-muted">Modification du véhicule</span>
            </div>)}
        </div>
    )
}