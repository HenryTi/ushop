import { Page } from "tonwa-controller/Page";
import { FA, List, LMR } from "tonwa-react";

interface Props<T> {
    caption: string;
    icon: string;
    iconClass: string;
    list: T[];
    onAdd: () => void;
    onEditItem: (item: T) => void;
    renderIDValue: (item: T) => JSX.Element;    // renderItemInList
}

export function PIDList<T>(props: Props<T>) {
    let { caption, icon, iconClass, list, onAdd, onEditItem, renderIDValue } = props;
    let renderItem = (item: T, index: number) => {
        let vIcon: any;
        if (icon) {
            vIcon = <FA name={icon} className={'me-4 ' + (iconClass ?? 'text-primary')} fixWidth={true} size="lg" />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {renderIDValue(item)}
            </div>
        </LMR>;
    }

    let right: JSX.Element;
    if (onAdd) {
        right = <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
            <FA name="plus" />
        </button>;
    };

    return <Page header={caption} right={right}>
        <List items={list}
            item={{ render: renderItem, onClick: onEditItem }} />
    </Page>;
}
