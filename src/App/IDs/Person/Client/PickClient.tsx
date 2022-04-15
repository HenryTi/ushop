import { PickQueryPage } from "tonwa-com";
import { Role } from "uqs/BzWorkshop";
import { ClientView } from "./ClientView";
import { useUqClient } from "./UqClient";

export function PickClient() {
    let uqClient = useUqClient();
    async function query() {
        return await uqClient.loadList(Role.client);
    }
    return <PickQueryPage query={query} header="Select client" ItemView={ClientView} />;
}
