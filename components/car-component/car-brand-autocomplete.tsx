"use client";

import {
    Collection,
    ComboBox,
    EmptyState,
    Input,
    Label,
    ListBox,
    ListBoxLoadMoreItem,
    Spinner,
} from "@heroui/react";
import {useAsyncList} from "@react-stately/data";
import {useState} from "react";

interface CarBrand {
    id: string;
    name: string;
}

interface CarBrandAutoCompleteProps {
    defaultValue?: string; // ← la valeur existante à afficher au départ
    onChange?: (value: string) => void; // ← pour remonter la valeur au parent
}

export function CarBrandAutoComplete({
                                         defaultValue = "",
                                         onChange,
                                     }: CarBrandAutoCompleteProps){


    const list = useAsyncList<CarBrand>({
        initialFilterText: defaultValue,
        async load({filterText, signal}) {
            const res = await fetch(`/api/car-brands?q=${encodeURIComponent(filterText ?? "")}`,
                {signal}
            );
            const json = await res.json();
            return {
                cursor: undefined,
                items: json.items,
            };
        },
    });

    const handleSelectionChange = (key: React.Key | null) => {
        if (!key) return;

        // Retrouver le nom de la marque depuis l'id sélectionné
        const selected = list.items.find((item) => item.id === String(key));
        if (selected) {
            list.setFilterText(selected.name); // met à jour le texte de l'input
            onChange?.(selected.name);         // remonte la valeur au parent
        }
    };

    return (
        <ComboBox
            allowsEmptyCollection
            className="w-[256px]"
            inputValue={list.filterText}
            onInputChange={(value) => {
                list.setFilterText(value);        // met à jour la recherche
                onChange?.(value);                // remonte aussi la saisie libre
            }}
        >
            <Label>Fabricant</Label>
            <ComboBox.InputGroup>
                <Input placeholder="Fabricant..." name="brand"/>
                <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox renderEmptyState={() => <EmptyState />}>
                    <Collection items={list.items}>
                        {(item) => (
                            <ListBox.Item id={item.id} textValue={item.name} className="text-gray-600">
                                {item.name}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )}
                    </Collection>
                    <ListBoxLoadMoreItem
                        isLoading={list.loadingState === "loadingMore"}
                        onLoadMore={list.loadMore}
                    >
                        <div className="flex items-center justify-center gap-2 py-2">
                            <Spinner size="sm" />
                            <span className="muted text-sm">Recherche...</span>
                        </div>
                    </ListBoxLoadMoreItem>
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    );
}