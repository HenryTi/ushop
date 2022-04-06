import { useEffect, useState } from "react";
import { UqID } from "tonwa-uq";

interface Props<T extends { id?: number; }> {
    id: number;
    ID: UqID<T>;
    Value: (props: { value: T; }) => JSX.Element;
}

export function IDValue<T extends { id?: number; }>({ id, ID, Value }: Props<T>) {
    let [value, setValue] = useState<T>(undefined);
    useEffect(() => {
        async function getValue() {
            let ret = await ID.valueFromId(id);
            setValue(ret);
        }
        getValue();
    });
    if (value === null) return null;
    return <Value value={value ?? ({ id: undefined } as T)} />;
}
