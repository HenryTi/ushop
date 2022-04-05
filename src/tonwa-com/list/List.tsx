import React, { ChangeEvent } from "react";
import { Spinner } from "tonwa-com/coms";

interface ItemProps<T> {
    item: T;
}

interface Props<T> {
    items: readonly T[];
    keyName: string;
    ItemView?: (props: ItemProps<T>) => JSX.Element;
    sep?: JSX.Element;
    none?: JSX.Element;
    loading?: JSX.Element;
    onItemClick?: (item: T) => Promise<void>;
    onItemSelect?: (item: T, isSelected: boolean) => void;
}

export function List<T>(props: Props<T>) {
    let { items, keyName, ItemView, onItemClick, onItemSelect, sep, none, loading } = props;
    if (!items) {
        if (loading) return loading;
        return <Spinner className="mx-3 my-2 text-primary" />;
    }
    let len = items.length;
    if (len === 0) {
        if (none) return none;
        return <div className="mx-3 my-2 text-muted">-</div>;
    }

    ItemView = ItemView ?? DefaultItemView;
    let renderItem: (item: T, index: number) => JSX.Element;
    function onCheckChange(item: T, evt: ChangeEvent<HTMLInputElement>): void {
        onItemSelect(item, evt.currentTarget.checked);
    }
    if (onItemSelect) {
        if (onItemClick) {
            renderItem = v => (
                <div className="d-flex">
                    <label className="ps-3 pe-2 align-self-stretch d-flex align-items-center">
                        <input type="checkbox" className="form-check-input"
                            onChange={evt => onCheckChange(v, evt)} />
                    </label>
                    <div className="flex-grow-1 cursor-pointer" onClick={() => onItemClick(v)}>
                        <ItemView item={v} />
                    </div>
                </div>
            );
        }
        else {
            renderItem = v => (
                <label className="d-flex">
                    <input type="checkbox" className="form-check-input mx-3 align-self-center"
                        onChange={evt => onCheckChange(v, evt)} />
                    <div className="flex-grow-1">
                        <ItemView item={v} />
                    </div>
                </label>
            );
        }
    }
    else {
        renderItem = v => (
            <div onClick={() => onItemClick(v)} className={onItemClick ? 'cursor-pointer' : ''}>
                <ItemView item={v} />
            </div>
        );
    }
    if (sep === undefined) {
        sep = <div className="border-top border-1" />;
    }
    else if (typeof sep === 'number') {
        sep = <div className={'border-top border-' + sep} />;
    }
    return <ul className="m-0 p-0">{items.map((v, index) => (
        <React.Fragment key={keyName ? (v as any)[keyName] : index}>
            {renderItem(v, index)}
            {index < len - 1 && sep}
        </React.Fragment>
    ))}</ul>;
}

function DefaultItemView<T>(itemProps: ItemProps<T>) {
    let { item } = itemProps;
    let cn = 'px-3 py-2';
    return <div className={cn}>{JSON.stringify(item)}</div>;
}
