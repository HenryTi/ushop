import { useEffect } from "react";
import { FA, LMR, Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-com-uq";
import { Person } from "uq-app/uqs/BzWorkshop";
import { useUqApp } from "App/App";
import { ClientView, PickClient, MPerson } from "../../IDs";
import { ClientPage } from "./ClientPage";

export function ClientNotesPage() {
    let { uqs } = useUqApp();
    let nav = useNav();
    let listEditContext = useIdListEdit<any>(undefined);
    useEffect(() => {
        async function loadClients() {
            let { BzWorkshop } = uqs;
            //let { UserObject, IxStaffClient, Person } = BzWorkshop;
            let ret = await BzWorkshop.MyClients.query({});
            /*
            let ret = await BzWorkshop.QueryID<Person>({
                IX: [UserObject, IxStaffClient],
                IDX: [Person],
            });*/
            //this.deepData.clients = ret.ret;
            listEditContext.setItems(ret.ret);
        }
        loadClients();
    }, [listEditContext, uqs]);

    //let c = useCClientNotes();
    let showClient = async (client: Person) => {
        //await c.loadClientLog(client);
        nav.open(<ClientPage client={client} />);
    }

    let onSearch = async () => {
        let ret = await nav.call<Person>(<PickClient />);
        if (!ret) return;
        showClient(ret as any);
    }

    let right = <button className="btn btn-sm btn-primary me-2" onClick={onSearch}>
        <FA name="search" />
    </button>;

    function ItemView({ value }: { value: MPerson }) {
        return <LMR className="">
            <div>
                <ClientView value={value} />
            </div>
            <FA name="angle-right" className="mt-2 me-3" />
        </LMR>;
    }

    //let { clients } = c.deepData;
    return <Page header="Client notes" right={right}>
        <div className="">
            <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={showClient} />
            <Sep />
        </div>
    </Page>;
}
