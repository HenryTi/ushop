import { useUqApp } from "../../../App";
import { Role } from "uq-app/uqs/BzWorkshop";
import { IconCommand } from "../../../tool";
import { useUqStaff } from "./UqStaff";
import { useNav } from "tonwa-com";
import { StaffList } from "./StaffList";

export function StaffLink() {
    let uqApp = useUqApp();
    let nav = useNav();
    let caption = 'Staff';
    let icon = 'user';
    let iconClass: string = 'text-info';
    let { BzWorkshop } = uqApp.uqs;
    let uqStaff = useUqStaff({
        uq: BzWorkshop,
        ID: BzWorkshop.Person,
    });
    let onClick = () => {
        nav.open(async () => {
            let items = await uqStaff.loadList(Role.staff);
            return <StaffList items={items} caption={caption} icon={icon} iconClass={iconClass} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
