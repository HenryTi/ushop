import { Role } from "uqs/BzWorkshop";
import { IconCommand } from "../../../IconCommand";
import { useUqClient } from "./UqClient";
import { useNav } from "tonwa-com";
import { ClientList } from "./ClientList";
import { caption, icon, iconClass } from "./consts";

export function ClientLink() {
    let nav = useNav();
    let uqClient = useUqClient();
    let onClick = () => {
        nav.open(async () => {
            let items = await uqClient.loadList(Role.client);
            return <ClientList items={items} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
