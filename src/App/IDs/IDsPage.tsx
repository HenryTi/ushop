import { TagLink } from "../Tag";
import { ClientLink, StaffLink } from "./Person";
import { WorkshopLink } from "./Workshop";
import { Page } from "tonwa-com";

export function IDsPage() {
    return <Page header="Items">
        <div>
            <WorkshopLink />
            <StaffLink />
            <ClientLink />
            <TagLink />
        </div>
    </Page>;
}
