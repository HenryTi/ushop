import { proxy } from "valtio";
import { ID } from "tonwa-uq";
import { Role, Person } from "uqs/BzWorkshop";
import { BzWorkshop } from "uqs";
import { UqApp } from "App/UqApp";

export interface MPerson extends Person {
    user: number;
    role: Role;
}

export abstract class UqPerson {
    readonly uq: BzWorkshop.UqExt;
    readonly ID: ID;
    initNO: string;

    readonly state: {
        currentItem: any;
        items: any[];
    };

    constructor(uqApp: UqApp) {
        this.uq = uqApp.uqs.BzWorkshop;
        this.ID = uqApp.uqs.BzWorkshop.Person;

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

    abstract isInRole(role: Role): boolean;

    async loadList(personRole: Role): Promise<MPerson[]> {
        let result = await this.uq.GetPersonList.query({ role: personRole });
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
        await this.uq.ActIX({
            IX: this.uq.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        currentItem.user = undefined;
    }
}
