import { ID, IX, Uq } from "tonwa-uq";
import { Model } from "./Model";

export class MDraft extends Model {
    protected readonly ID: ID;
    protected readonly IX: IX;

    constructor(uq: Uq, ID: ID, IX?: IX) {
        super(uq);
        this.ID = ID;
        this.IX = IX;
    }

    async load<T>(id: number): Promise<T> {
        let result = await Promise.all([
            this.uq.ID({ IDX: this.ID, id }),
            this.uq.IX({ IX: this.IX, IDX: [this.ID], ix: id })
        ]);
        let ret: any = {};
        let main = result[0];
        if (main.length > 0) {
            let { content } = main[0];
            ret.$ = JSON.parse(content);
            //ret.$.$ID = ID;
        }
        for (let row of result[1]) {
            let { entity, content } = row;
            let IDRet = this.uq.IDEntity(entity);
            if (IDRet === undefined) continue;
            let IDname = IDRet.name;
            let arr: any[] = ret[IDname];
            if (arr === undefined) {
                ret[IDname] = arr = [];
            }
            let obj = JSON.parse(content);
            //obj.$ID = IDRet;
            arr.push(obj);
        }
        return ret;
    }

    async saveMain(main: any, IdMain?: ID): Promise<number> {
        let param: any = {};
        let value = {
            entity: IdMain !== undefined ? 0 : IdMain.typeId,
            content: JSON.stringify(main),
        }
        let draftName = this.ID.name;
        param[draftName] = [value];
        let ret = await this.uq.Acts(param);
        return ret[draftName][0];
    }

    async saveDetail(ix: number, details: object[], IdDetail?: ID): Promise<number[]> {
        let entity = IdDetail !== undefined ? 0 : IdDetail.typeId;
        let values = details.map(v => ({
            ix,
            xi: {
                entity,
                content: JSON.stringify(v),
            }
        }));
        let ret = await this.uq.ActIX({
            IX: this.IX,
            ID: this.ID,
            values,
        });
        return ret;
    }
}
