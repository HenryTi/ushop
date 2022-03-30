//import { app } from "../../App";
import { MDraft } from "tonwa-uq";

export class CTest {
    readonly mDraft: MDraft;

    constructor() {
        /*
        let { BzWorkshop } = app.uqs;
        let { Draft, IxDraft } = BzWorkshop;
        this.mDraft = new MDraft(BzWorkshop, Draft, IxDraft);
        */
    }

    async load() {
        let ret = await this.mDraft.load(1176521146368);
        alert(JSON.stringify(ret));
    }

    async save() {
        /*
        let { BzWorkshop } = app.uqs;
        let { Person } = BzWorkshop;
        let ret = await this.mDraft.saveMain('aaa');
        let d = await this.mDraft.saveDetail(ret, [{ b: 2 }, { b: 3 }], Person);
        alert(JSON.stringify([ret, d]));
        */
    }
}
