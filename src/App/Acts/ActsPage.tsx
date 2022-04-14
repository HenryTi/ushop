import { Page } from "tonwa-com";
import { WorkshopActsLink } from "./WorkshopActs";
import { ClientNotesLink } from "./ClientNotes";

export function ActsPage() {
    return <Page header="Home">
        <div className="">
            <WorkshopActsLink />
            <ClientNotesLink />
        </div>
    </Page>;
}
