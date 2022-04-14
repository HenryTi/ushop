import { Workshop } from "uq-app/uqs/BzWorkshop";

export function WorkshopView({ value }: { value: Workshop; }) {
    let { no, name } = value;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{name}</div>
    </>;
}
