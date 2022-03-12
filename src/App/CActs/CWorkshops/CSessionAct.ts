import { CClient, CWorkshop } from "../../CIds";
import { CActs } from "../CActs";
import { CSelectOne, deepReact, setReact } from "tonwa-contoller";
import { CWorkshops, MSession } from ".";
import { CAct } from "../CAct";
import { VAttendee } from "./VAttendee";
import { VSession } from "./VSession";

export class CSessionAct extends CAct {
    readonly cWorkshops: CWorkshops;
    readonly cWorkshop: CWorkshop;
    readonly cClient: CClient;
    readonly session: MSession;
    readonly deep: {
        list: any[];
    } = deepReact({ list: null });

    constructor(cActs: CActs, cWorkshops: CWorkshops, session: MSession) {
        super(cActs);
        this.cWorkshops = cWorkshops;
        this.cWorkshop = cWorkshops.cWorkshop;
        this.cClient = cWorkshops.app.cIds.cClient;
        this.session = session;
    }

    async openMain(): Promise<void> {
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.IX({
            IX: BzWorkshop.IxSessionClient,
            ix: this.session.id,
        });
        setReact(() => {
            this.deep.list = ret;
        });
        this.open(VSession);
    }

    addAttendee = async () => {
        let { BzWorkshop } = this.uqs;
        let cSelectOne = new CSelectOne(this.cClient);
        let ret = await cSelectOne.select();
        let sessionId = this.session.id;
        let clientId = ret.id;
        let now = Math.floor(Date.now() / 1000);
        let ixValue = {
            ix: sessionId,
            xi: clientId,
            deleted: 0,
            $create: now,
            $update: now,
        };
        await BzWorkshop.SaveSessionAttendee.submit({
            session: sessionId,
            client: clientId,
            deleted: 0,
        });
        /*
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxSessionClient,
            values: [ixValue],
        });
        */
        setReact(() => {
            let { list } = this.deep;
            let index = list.findIndex(v => v.xi === clientId);
            if (index >= 0) {
                list.splice(index, 1);
            }
            list.unshift(ixValue);
        });
    }

    showAttendee = async (row: any) => {
        this.open(VAttendee, row);
    }

    changeSessionClient = async (row: any) => {
        let { BzWorkshop } = this.uqs;
        let { ix, xi, deleted } = row;
        deleted = 1 - deleted;
        /*
        await BzWorkshop.Acts({
            ixSessionClient: [{
                ix, xi, deleted,
            }],
        });
        */
        await BzWorkshop.SaveSessionAttendee.submit({
            session: ix,
            client: xi,
            deleted,
        });
        let ixVal = this.deep.list.find(v => v.xi === xi);
        ixVal.deleted = deleted;
        this.close();
    }
}
