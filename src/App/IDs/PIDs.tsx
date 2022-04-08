import { IconCommand } from "../tool";
import { TagPage } from "../Tag";
import { ClientLink, StaffLink } from "./Person";
import { WorkshopLink } from "./Workshop";
import { Page, useNav } from "tonwa-com";

export function PIDs() {
    let nav = useNav();
    return <Page header="Items">
        <div>
            <WorkshopLink />
            <ClientLink />
            <StaffLink />
            <IconCommand caption="Tags admin" icon="tag" iconClass="text-danger"
                onClick={() => nav.open(<TagPage />)} />
        </div>
    </Page>;
}

/*{
    [cWorkshop].map((v, index) => {
        if (v.isVisible() === false) return null;
        let { caption, icon, iconClass } = v;
        return <IconCommand key={index} caption={caption} icon={icon} iconClass={iconClass}
            onClick={() => v.openMain()} />;
    })
}
*/