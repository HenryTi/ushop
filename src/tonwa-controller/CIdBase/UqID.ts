import { ID, Uq } from "tonwa-uq";
import { proxy } from "valtio";

export interface UqIDProps {
    uq: Uq;
    ID: ID;
}

export abstract class UqID {
    readonly uq: Uq;
    readonly ID: ID;
    initNO: string;

    readonly state: {
        currentItem: any;
        items: any[];
    };

    constructor(uqIDProps: UqIDProps) {
        let { uq, ID } = uqIDProps;
        this.uq = uq;
        this.ID = ID;

        this.state = proxy({
            currentItem: undefined,
            items: undefined,
        });
    }

    async savePropValue(propName: string, value: string) {
        let { currentItem } = this.state;
        await this.uq.ActIDProp(this.ID, currentItem.id, propName, value);
        currentItem[propName] = value;
    }

    async newIDNO() {
        this.initNO = await this.uq.IDNO({ ID: this.ID });
    }
}
