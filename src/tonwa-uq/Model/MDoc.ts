import { ID, IX, Uq } from "tonwa-uq";
import { Model } from "./Model";

// main-detail structure
export class MDoc extends Model {
    protected readonly ID: ID;
    protected readonly IX: IX;

    constructor(uq: Uq, ID: ID, IX?: IX) {
        super(uq);
        this.ID = ID;
        this.IX = IX;
    }

    async load<T = any>(id: number): Promise<T> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let result = await Promise.all([
            this.uq.ID({ IDX: this.ID, id }),
            this.uq.IXValues({ IX: this.IX, ix: id })
        ]);
        let ret: any = {};
        return ret;
    }

    async save(id: number, obj: object): Promise<number> {
        return 0;
    }

    async saveDetail(ix: number, Detail: ID, obj: object): Promise<number> {
        return 0;
    }
}
