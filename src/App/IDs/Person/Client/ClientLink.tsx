import { useUqApp } from "../../../App";
import { Role } from "uq-app/uqs/BzWorkshop";
import { IconCommand } from "../../../tool";
import { useUqClient } from "./UqClient";
import { useNav } from "tonwa-com";
import { ClientList } from "./ClientList";

export function ClientLink() {
    let uqApp = useUqApp();
    let nav = useNav();
    let caption = 'Client';
    let icon = 'user-o';
    let iconClass: string = 'text-info';
    let { BzWorkshop } = uqApp.uqs;
    let uqClient = useUqClient({
        uq: BzWorkshop,
        ID: BzWorkshop.Person,
    });
    let onClick = () => {
        nav.open(async () => {
            let items = await uqClient.loadList(Role.client);
            //return <StaffList items={items} />;
            return <ClientList items={items} caption={caption} icon={icon} iconClass={iconClass} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
