import { MDraft } from "tonwa-uq";
import { CControl } from "../../CControl";
import { App } from "../../App";
import { PMain } from "./PMain";

export class CTest extends CControl {
    readonly mDraft: MDraft;

    constructor(app: App) {
        super(app);
        let { BzWorkshop } = this.uqs;
        let { Draft, IxDraft } = BzWorkshop;
        this.mDraft = new MDraft(BzWorkshop, Draft, IxDraft);
    }

    openMain(): void {
        this.open(PMain);
    }

    onTestSave = async () => {
        let { BzWorkshop } = this.uqs;
        let { Person } = BzWorkshop;
        let ret = await this.mDraft.saveMain('aaa');
        let d = await this.mDraft.saveDetail(ret, [{ b: 2 }, { b: 3 }], Person);
        alert(JSON.stringify([ret, d]));
    }

    onTestLoad = async () => {
        let ret = await this.mDraft.load(1176521146368);
        alert(JSON.stringify(ret));
    }
}