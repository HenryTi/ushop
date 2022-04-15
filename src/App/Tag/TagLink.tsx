import { useNav } from "tonwa-com";
import { IconCommand } from "../IconCommand";
import { TagPage } from "./TagPage";

export function TagLink() {
    let nav = useNav();
    const caption = 'Tags admin';
    const icon = 'tag';
    const iconClass = 'text-danger';
    function onClick() {
        nav.open(<TagPage caption={caption} icon={icon} iconClass={iconClass} />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
