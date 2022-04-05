import { FA, List, LMR, Page, useNav, usePromise } from "tonwa-com";
import { useUqApp } from "../../App";
import { Workshop } from "uq-app/uqs/BzWorkshop";
import { WorkshopItem } from "./WorkshopItem";
import { AddWorkshop } from "./AddWorkshop";
import { useCallback, useEffect, useState } from "react";
import { EditWorkshop } from "./EditWorkshop";

interface Props {
    caption: string;
    icon: string;
    iconClass: string;
}

export function WorkshopList(props: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let nav = useNav();
    let { caption, icon, iconClass } = props;
    function ItemView({ item }: { item: Workshop }) {
        return <LMR className="px-3 py-2 align-items-center">
            {icon &&
                <FA name={icon} className={'me-4 ' + (iconClass ?? 'text-primary')} fixWidth={true} size="lg" />
            }
            <div>
                <WorkshopItem item={item} />
            </div>
            <FA name="angle-right" />
        </LMR>;
    }
    let [list, setList] = useState<Workshop[]>();
    let callback = useCallback(async function () {
        let ret = await BzWorkshop.QueryID<Workshop>({
            ID: BzWorkshop.Workshop,
            page: { start: 0, size: 10 },
            order: 'desc',
        });
        setList(ret);
    }, [BzWorkshop]);
    useEffect(() => {
        callback();
    }, [callback]);

    let onAdd = async () => {
        nav.open(<AddWorkshop />, () => {
            callback();
            return true;
        });
    };
    async function onItemChanged(item: Workshop, preItem: Workshop) {
        let index = list.findIndex(v => v.id === item.id);
        if (index >= 0) {
            list.splice(index, 1, item);
            setList([...list]);
        }
    }

    let onEditItem = (item: Workshop): Promise<void> => {
        nav.open(<EditWorkshop item={item} onItemChanged={onItemChanged} />);
        return;
    };

    let right = <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
        <FA name="plus" />
    </button>;

    return <Page header={caption} right={right}>
        <List items={list} keyName="id" ItemView={ItemView} onItemClick={onEditItem} />
    </Page>;
}
