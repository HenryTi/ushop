import { useNav } from "tonwa-com";
import { IconCommand } from "../../tool";
import { WorkshopList } from "./WorkshopList";

export function WorkshopLink() {
    let nav = useNav();
    const caption = 'Workshop';
    const icon = 'book';
    const iconClass = 'text-warning';
    function onClick() {
        nav.open(<WorkshopList caption={caption} icon={icon} iconClass={iconClass} />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
