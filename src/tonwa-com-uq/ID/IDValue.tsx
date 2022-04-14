import { useEffect, useState } from "react";
import { ID, UqID } from "tonwa-uq";

interface Props<T extends { id?: number; }> {
    id: number;
    ID: UqID<T>;
    Template: (props: { value: T; }) => JSX.Element;
}

const maxArr = 1000;
interface IDCache {
    ID: ID;
    values: { [id: number]: any };
    arr: number[];
}
const caches: IDCache[] = [];

export function IDValue<T extends { id?: number; }>({ id, ID, Template: Value }: Props<T>) {
    let [value, setValue] = useState<T>(undefined);
    useEffect(() => {
        async function getValue() {
            let idCache = caches.find(v => v.ID === ID);
            if (idCache === undefined) {
                idCache = { ID, values: {}, arr: [], };
                caches.push(idCache);
            }
            let { values, arr } = idCache;
            let val = values[id];
            if (!val) {
                let ret = await (ID.uq as any).ID({ IDX: ID, id });
                val = ret[0];
                values[id] = val;
            }
            else {
                let index = arr.findIndex(v => v === id);
                if (index >= 0) arr.splice(index, 1);
            }
            arr.push(id);
            if (arr.length > maxArr) {
                arr.shift();
            }
            setValue(val);
        }
        getValue();
    }, [id, ID]);
    if (value === null) return null;
    return <Value value={value ?? ({ id: undefined } as T)} />;
}
