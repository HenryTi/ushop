import { openPage, VPage } from "tonwa-controller";
import { IconCommand } from "../tool";
import { PTag } from "../Tag";
import { CIds } from "./CIds";
import { RefStaff } from "./CPerson";

export class VStart extends VPage<CIds> {
    header(): string | boolean | JSX.Element {
        return 'Items';
    }

    content() {
        let { cWorkshop, cStaff, cClient } = this.controller;
        return <div>
            {
                [cWorkshop, cStaff, cClient].map((v, index) => {
                    if (v.isVisible() === false) return null;
                    let { caption, icon, iconClass } = v;
                    return <IconCommand key={index} caption={caption} icon={icon} iconClass={iconClass}
                        onClick={() => v.openMain()} />;
                })
            }
            <RefStaff />
            <IconCommand caption="Tags admin" icon="tag" iconClass="text-danger"
                onClick={() => openPage(<PTag />)} />
        </div>;
    }
}
