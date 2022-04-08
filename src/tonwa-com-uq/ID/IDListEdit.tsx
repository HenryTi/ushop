import { useRef } from "react";
import { List, ListPropsWithoutItems } from "tonwa-com";
import { proxy, useSnapshot } from "valtio";

interface Props<T extends { id?: number; }> extends ListPropsWithoutItems<T> {
    context: IDListEditContext<T>;
}

export class IDListEditContext<T extends { id?: number; }> {
    private readonly response: { items: T[]; };
    constructor(items: T[]) {
        this.response = proxy({ items });
    }

    setItems(items: T[]) {
        this.response.items = items;
    }
    getResponse() { return this.response; }

    private findIndex(item: T): number {
        let { items } = this.response;
        let p = items.findIndex(v => v.id === item.id);
        return p;
    }

    onItemChanged(item: T) {
        let p = this.findIndex(item);
        let { items } = this.response;
        if (p >= 0) {
            Object.assign(items[p], item);
        }
        else {
            items.unshift(item);
        }
    }

    onItemDeleted(item: T) {
        let p = this.findIndex(item);
        if (p >= 0) this.response.items.splice(p, 1);
    }
}

export function IDListEdit<T extends { id?: number; }>(props: Props<T>) {
    let { context } = props;
    let { items } = useSnapshot(context.getResponse());
    return <List {...props} items={items as any} />;
}

export function useIdListEditContext<T>(items: T[]) {
    let { current } = useRef(new IDListEditContext<T>(items));
    return current;
}
