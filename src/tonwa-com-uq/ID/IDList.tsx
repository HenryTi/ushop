import { Page, FA, LMR } from "tonwa-com";

interface Props<T> {
    caption: string;
    icon: string;
    iconClass: string;
    list: T[];
    onAdd: () => void;
    onEditItem: (item: T) => void;
    IDValue: ({ item }: { item: T; }) => JSX.Element;    // renderItemInList
}

export function IDList<T>(props: Props<T>) {
    let { caption, icon, iconClass, list, onAdd, onEditItem, IDValue } = props;

    let right: JSX.Element;
    if (onAdd) {
        right = <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
            <FA name="plus" />
        </button>;
    };
    return <Page header={caption} right={right}>
        {list.map((v, index) => (
            <LMR key={index}
                className="px-3 py-2 align-items-center"
                onClick={() => onEditItem(v)}
            >
                <div>
                    {
                        icon && <FA name={icon}
                            className={'me-4 ' + (iconClass ?? 'text-primary')}
                            fixWidth={true} size="lg" />
                    }
                    <IDValue item={v} />
                    <FA name="angle-right" />
                </div>
            </LMR>
        ))}
    </Page>;
}
