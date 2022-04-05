import { openPage, Page, VPage } from "tonwa-controller";
import { IconCommand } from "../tool";
import { PTag } from "../Tag";
import { RefClient, RefStaff } from "./Person";
import { WorkshopLink } from "./Workshop";

export function PIDs() {
    // let { cWorkshop } = this.controller;
    return <Page header="Items">
        <div>
            <WorkshopLink />
            <RefClient />
            <RefStaff />
            <IconCommand caption="Tags admin" icon="tag" iconClass="text-danger"
                onClick={() => openPage(<PTag />)} />
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