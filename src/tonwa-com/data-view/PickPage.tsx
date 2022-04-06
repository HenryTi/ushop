import { useNav, Page } from "../page";
import { List } from '../list';
import { useEffect, useState } from "react";

export type ItemsQuery<T> = (pageStart?: any, pageSize?: number) => Promise<T[]>;

interface PickProps<T> {
    header: string | JSX.Element;
    className?: string;
    ItemView: (props: { value: T; }) => JSX.Element;
    top?: JSX.Element;
    bottom?: JSX.Element;
}

interface PickPageProps<T> extends PickProps<T> {
    items: T[];
}

export function PickPage<T>({ header, className, ItemView, items, top, bottom }: PickPageProps<T>) {
    let nav = useNav();
    function onItemClick(item: T): Promise<void> {
        nav.returnCall(item);
        return;
    }
    return <Page header={header}>
        {top}
        <List className={className ?? 'my-1 border-top border-bottom border-2'}
            items={items}
            ItemView={ItemView}
            onItemClick={onItemClick} />
        {bottom}
    </Page>
}

interface PickFromQueryProps<T> extends PickProps<T> {
    query: ItemsQuery<T>;
}

export function PickFromQuery<T>(props: PickFromQueryProps<T>) {
    let { query } = props;
    let [items, setItems] = useState<T[]>(undefined);
    useEffect(() => {
        async function load() {
            let ret = await query();
            setItems(ret);
        }
        load();
    }, [query]);
    return <PickPage {...props} items={items} />;
}

export function PickInfiniteScroll<T>(props: PickFromQueryProps<T>) {

}

export function PickPrevNext<T>(props: PickFromQueryProps<T>) {

}
