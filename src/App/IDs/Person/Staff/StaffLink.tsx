import { Role } from "uqs/BzWorkshop";
import { IconCommand } from "../../../IconCommand";
import { caption, icon, iconClass, useUqStaff } from "./UqStaff";
import { useNav } from "tonwa-com";
import { StaffList } from "./StaffList";

export function StaffLink() {
    let nav = useNav();
    let uqStaff = useUqStaff();
    let onClick = () => {
        nav.open(async () => {
            let items = await uqStaff.loadList(Role.staff);
            return <StaffList items={items} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
