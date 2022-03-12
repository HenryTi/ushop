import { Workshop } from "uq-app/uqs/BzWorkshop";

export function renderWorkshopItem(item: Workshop) {
    let { no, name } = item;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{name}</div>
    </>;
}
