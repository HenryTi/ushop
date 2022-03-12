import { Controller, CSelectOne, deepReact, react, setReact } from "tonwa-contoller";
import { Pick } from "tonwa-react";
import { mutedSmall } from "../tool";
import { CId } from "./CId";

export class CIdPick<C extends CId> extends Controller implements Pick<number> {
    protected readonly cId: C;
    // protected id: number;
    deepValue: {
        id: number;
    } = deepReact({ id: null, });
    constructor(c: C, id: number) {
        super(c.app);
        this.cId = c;
        this.deepValue.id = id;
    }

    pick = async (): Promise<number> => {
        let cSelectOne = new CSelectOne(this.cId);
        let ret = await cSelectOne.select();
        let id = ret.id;
        setReact(() => {
            this.deepValue.id = id;
        })
        return id;
    }

    ref() {
        return react(() => {
            let { id } = this.deepValue;
            if (id === null) {
                return this.renderInit();
            }
            if (id === undefined) {
                return this.renderNA();
            }
            return this.cId.renderId(id);
        });
    }

    protected renderInit() {
        return mutedSmall(`Pick ${this.cId.caption}`);
    }

    protected renderNA() {
        return mutedSmall(' - ');
    }
}
