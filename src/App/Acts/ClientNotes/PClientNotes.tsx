import { CSelectOne, openPage, Page, VPage } from "tonwa-controller";
import { FA, List, LMR } from "tonwa-react";
import { Person } from "uq-app/uqs/BzWorkshop";
import { useCClientNotes } from "./CClientNotes";
import { PClient } from "./PClient";

export function PClientNotes() {
    let c = useCClientNotes();
    let showClient = async (client: Person) => {
        await c.loadClientLog(client);
        openPage(<PClient controller={c} client={client} />);
    }

    let onSearch = async () => {
        let cSelectOne = new CSelectOne(undefined/*this.controller.cClient*/);
        let ret = await cSelectOne.select();
        if (!ret) return;
        showClient(ret as any);
    }

    let right = <button className="btn btn-sm btn-primary me-2" onClick={onSearch}>
        <FA name="search" />
    </button>;

    let renderItem = (item: any, index: number) => {
        //let { icon } = this.controller.cClient;
        let icon: any = 'user-o';
        let vIcon: any;
        if (icon) {
            vIcon = <FA name="user-o" className="me-3 text-primary " fixWidth={true} />;
        }
        let right = <FA name="angle-right" />
        return <LMR className="px-3 py-2 align-items-center" left={vIcon} right={right}>
            <div>
                {/*this.controller.cClient.renderItemInList(item)*/}
            </div>
        </LMR>;
    }

    let { clients } = c.deepData;
    return <Page header="Client notes" right={right}>
        <div className="">
            <List items={clients}
                item={{ render: renderItem, onClick: showClient }} />
        </div>
    </Page>;
}
