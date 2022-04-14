import { UserView } from "tonwa-com-uq";
import { LMR } from "tonwa-react";
import { MPerson } from "./UqPerson";

export function PersonView({ value }: { value: MPerson; }) {
    let { no, name, firstName, lastName, middleName, user } = value;
    return <>
        <div className="small text-muted me-3">{no} <UserView id={user} /></div>
        <div>
            {name ?? <>{lastName} {middleName} {firstName}</>}
        </div>
    </>;
}

export function renderSelectPerson(item: any) {
    let { no, name, firstName, lastName, middleName } = item;
    let right = <span className="small text-muted">{no}</span>;
    return <LMR className="w-100" right={right}>
        {name ?? <>{lastName} {middleName} {firstName}</>}
    </LMR>;
}
