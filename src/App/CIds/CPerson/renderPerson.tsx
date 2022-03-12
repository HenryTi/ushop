import { CUser, User } from "tonwa-contoller";
import { LMR } from "tonwa-react";

export function renderPerson(item: any, cUser?: CUser) {
    let { no, name, firstName, lastName, middleName, user } = item;
    let vUser: any;
    if (cUser && user) {
        vUser = cUser.renderUser(user, (user: User) => {
            let { name } = user;
            return <span className="ms-4">
                user:  {name}
            </span>;
        });
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
