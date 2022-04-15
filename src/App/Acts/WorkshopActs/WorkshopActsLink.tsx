import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { consts } from "./consts";
import { WorkshopActs } from "./WorkshopActs";

export function WorkshopActsLink() {
    let nav = useNav();
    function onClick() {
        //<WorkshopList caption={caption} icon={icon} iconClass={iconClass} />
        nav.open(<WorkshopActs />);
    }
    let { caption, icon, iconClass } = consts;
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
