import { User, VUser } from "tonwa-controller";
import { FA } from "tonwa-react";
import { Role } from "uq-app/uqs/BzWorkshop";
import { MPerson } from "../UqPerson";

const roleCaption: { [role in Role]?: string } = {
    [Role.counselor]: 'Counselor',
    [Role.volunteer]: 'Volunteer',
};

export function renderStaff(item: MPerson) {
    let { no, name, firstName, lastName, middleName, user, role } = item;
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
