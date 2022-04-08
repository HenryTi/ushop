import { User, VUser } from "tonwa-controller";
import { LMR } from "tonwa-react";
import { MPerson } from "./UqPerson";

export function PersonView({ value: item }: { value: MPerson; }) {
    let { no, name, firstName, lastName, middleName, user } = item;
    let vUser: any;
    if (user) {
        let renderUser = (user: User) => {
            let { name } = user;
            return <span className="ms-4">
                user:  {name}
            </span>;
        };
        vUser = <VUser id={user} render={renderUser} />;
    }
    return <>
        <div className="small text-muted me-3">{no} {vUser}</div>
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
