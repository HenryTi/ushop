import { useUqApp } from "App/App";
import { PickQueryPage } from "tonwa-com";
import { Role } from "uq-app/uqs/BzWorkshop";
import { ClientView } from "./ClientView";
import { UqClient } from "./UqClient";

export function PickClient() {
    let { uqs } = useUqApp();
    let { BzWorkshop } = uqs;
    let uqClient = new UqClient({ uq: BzWorkshop, ID: BzWorkshop.Person, })
    async function query() {
        return await uqClient.loadList(Role.client);
    }
    return <PickQueryPage query={query} header="Select client" ItemView={ClientView} />;
}
