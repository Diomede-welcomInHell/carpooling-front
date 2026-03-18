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
import { useAsyncList } from "@react-stately/data";

interface Commune {
    nom: string;
    code: string;
    codesPostaux: string[];
}

interface CommuneAvecCP {
    id: string;        // code + CP pour avoir un id unique
    nom: string;
    code: string;
    codePostal: string; // un seul CP par item
}

interface TripCityAutoCompleteProps {
    title: string;
    nameInput: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export function TripCityAutoComplete({
                                         title,
                                         nameInput,
                                         defaultValue = "",
                                         onChange,
                                     }: TripCityAutoCompleteProps) {

    const list = useAsyncList<CommuneAvecCP>({
        initialFilterText: defaultValue,
        async load({ filterText, signal }) {
            if (!filterText) return { items: [] };
            const res = await fetch(
                `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(filterText)}&limit=5`,
                { signal }
            );
            const json: Commune[] = await res.json();

            // Vannes avec ["56000", "56100"] devient deux items :
            // { id: "56260-56000", nom: "Vannes", codePostal: "56000" }
            // { id: "56260-56100", nom: "Vannes", codePostal: "56100" }
            const items = json.flatMap(commune =>
                commune.codesPostaux.map(cp => ({
                    id: `${commune.code}-${cp}`,
                    nom: commune.nom,
                    code: commune.code,
                    codePostal: cp,
                }))
            );

            return { cursor: undefined, items };
        },
    });

    return (
            <ComboBox
                allowsEmptyCollection
                className="w-[256px]"
                inputValue={list.filterText}
                onInputChange={(value) => {
                    list.setFilterText(value);
                    onChange?.(value);
                }}
            >
                <Label>{title}</Label>
                <ComboBox.InputGroup>
                    <Input placeholder="Ville..." name={nameInput} />
                    <ComboBox.Trigger />
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                    <ListBox renderEmptyState={() => <EmptyState />}>
                        <Collection items={list.items}>
                            {(item) => (
                                <ListBox.Item id={item.id} textValue={`${item.nom} ${item.codePostal}`} className="text-gray-600">
                                    {item.nom} — {item.codePostal}
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