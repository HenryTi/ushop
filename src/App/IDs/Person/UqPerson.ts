import { ID, Uq } from "tonwa-uq";
import { proxy } from "valtio";
import { Role, Person, UqExt } from "uq-app/uqs/BzWorkshop";

export interface MPerson extends Person {
    user: number;
    role: Role;
}

export interface UqIDProps {
    uq: Uq;
    ID: ID;
}

abstract class UqID {
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

export abstract class UqPerson extends UqID {
    abstract isInRole(role: Role): boolean;

    async loadList(personRole: Role): Promise<MPerson[]> {
        let result = await (this.uq as UqExt).GetPersonList.query({ role: personRole });
        let { ret, roles: retRoles } = result;
        let mPerson: MPerson;
        for (let row of ret) {
            let { id } = row;
            mPerson = row as any;
            for (let r of retRoles) {
                let { person, role } = r;
                if (person !== id) continue;
                if (this.isInRole(role as Role) === true) {
                    mPerson.role = role as Role;
                    break;
                }
            }
        }
        return ret as MPerson[];
    }

    async removeBoundUser() {
        let { currentItem } = this.state;
        let BzWorkshop = this.uq as UqExt;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        currentItem.user = undefined;
    }
}
