import { Workshop } from "uqs/BzWorkshop";

export function WorkshopItem({ item }: { item: Workshop; }) {
    let { no, name } = item;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{name}</div>
    </>;
}
