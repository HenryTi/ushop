import { UserView } from "tonwa-com-uq";
import { FA } from "tonwa-com";
import { MPerson } from "../UqPerson";
import { icon, iconClass, staffRoleCaptions } from "./UqStaff";

export function StaffView({ value: item }: { value: MPerson; }) {
    let { no, name, firstName, lastName, middleName, user, role } = item;
    let vRole: any;
    if (role) {
        vRole = <span className="ms-3"><FA name='dot' /> {staffRoleCaptions[role]}</span>;
    }
    return <div className="d-flex py-3">
        <div className="mx-4"><FA name={icon} className={iconClass} size="lg" /></div>
        <div className="">
            <div className="small text-muted me-3">{no} <UserView id={user} /></div>
            <div>
                {name ?? <>{lastName} {middleName} {firstName}</>}
                {vRole}
            </div>
        </div>
    </div>;
}
