import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { ClientNotesPage } from "./ClientNotesPage";
//import { WorkshopList } from "./WorkshopList";

export function ClientNotesLink() {
    let nav = useNav();
    const caption = 'Client notes';
    const icon = 'user-o';
    const iconClass = 'text-primary';
    function onClick() {
        //<WorkshopList caption={caption} icon={icon} iconClass={iconClass} />
        nav.open(<ClientNotesPage />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
