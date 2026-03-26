"use client";

import type {DateValue} from "@internationalized/date";

import {Button, Calendar, DateField, DatePicker, Description, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

interface DatePickerProps {
    nameInput : string;
}

export default function DateSelection(props: DatePickerProps) {
    const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));

    return (
        <div className="flex w-64 flex-col gap-4">
            <DatePicker name={props.nameInput} value={value} onChange={setValue}>
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
            <Description>Current value: {value ? value.toString() : "(empty)"}</Description>
            <div className="flex gap-2">
                <Button variant="outline" className="text-foreground" onPress={() => setValue(today(getLocalTimeZone()))}>
                    Set today
                </Button>
                <Button variant="outline" className="text-foreground" onPress={() => setValue(null)}>
                    Clear
                </Button>
            </div>
        </div>
    );
}