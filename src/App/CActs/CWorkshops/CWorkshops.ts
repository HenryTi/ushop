import { CActs } from "../../CActs";
import { CWorkshop } from "../../CIds";
import { setReact, shallowReact } from "tonwa-contoller";
import { Session } from "uq-app/uqs/BzWorkshop";
import { CAct } from "../CAct";
import { CSessionAct } from "./CSessionAct";
import { VStart } from "./VStart";

export interface WorkshopItem {
    workshop: number;
    sessions: MSession[];
}

export interface MSession extends Session {
    workshop: number;
    own: number;
    substitue: number;
    done: number;
}

export class CWorkshops extends CAct {
    readonly cWorkshop: CWorkshop;
    shallow: {
        workshopItems: WorkshopItem[];
    } = shallowReact({ workshopItems: null });

    constructor(cActs: CActs) {
        super(cActs);
        this.cWorkshop = cActs.app.cIds.cWorkshop;
    }

    async openMain(): Promise<void> {
        await this.loadList();
        this.open(VStart);
    }

    private async loadList() {
        let ret = await this.uqs.BzWorkshop.MySessions.query({});
        let coll: { [id: number]: WorkshopItem } = {};
        let workshopItems: WorkshopItem[] = [];
        for (let row of ret.ret) {
            let { workshop } = row;
            let workshopItem = coll[workshop];
            if (!workshopItem) {
                workshopItem = { workshop, sessions: [] };
                coll[workshop] = workshopItem;
                workshopItems.push(workshopItem);
            }
            workshopItem.sessions.push(row);
        }
        workshopItems.sort((a, b) => {
            let { workshop: wa } = a;
            let { workshop: wb } = b;
            if (wa > wb) return -1;
            if (wa === wb) return 0;
            return 1;
        })
        setReact(() => {
            this.shallow.workshopItems = workshopItems;
        });
    }

    async openSession(session: MSession) {
        let cSessionAct = new CSessionAct(this.cActs, this, session);
        cSessionAct.openMain();
    }
}