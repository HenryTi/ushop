import { CUser, User } from "tonwa-contoller";
import { FA } from "tonwa-react";
import { Role } from "uq-app/uqs/BzWorkshop";
import { MPerson } from "../CPerson";

const roleCaption: { [role in Role]?: string } = {
    [Role.counselor]: 'Counselor',
    [Role.volunteer]: 'Volunteer',
};

export function renderStaff(item: MPerson, cUser?: CUser) {
    let { no, name, firstName, lastName, middleName, user, role } = item;
    let vUser: any;
    if (cUser && user) {
        vUser = cUser.renderUser(user, (user: User) => {
            let { name } = user;
            return <span className="ms-4">
                user:  {name}
            </span>;
        });
    }
    let vRole: any;
    if (role) {
        vRole = <span className="ms-3"><FA name='dot' /> {roleCaption[role]}</span>;
    }
    return <>
        <div className="small text-muted me-3">{no} {vUser}</div>
        <div>
            {name ?? <>{lastName} {middleName} {firstName}</>}
            {vRole}
        </div>
    </>;
}
