import { Schema, UiSchema, UiTextItem } from "tonwa-react";
import { Uq } from "tonwa-uq";
import { CId } from "../CId";
import { renderPerson, renderSelectPerson } from "./renderPerson";
import { CIdBase, IdValue, VPage, react, setReact, User, VUser, selectUser } from "tonwa-controller";
import { Role, Person } from "uq-app/uqs/BzWorkshop";

export interface MPerson extends Person {
    user: number;
    role: Role;
}

export abstract class CPerson extends CId {
    abstract get personRole(): Role;
    get uq(): Uq { return this.uqs.BzWorkshop; };
    getID() { return this.uqs.BzWorkshop.Person; }
    get caption() { return 'Staff' }
    get schema(): Schema {
        return this.uqs.BzWorkshop.Person.ui.fieldArr;
    }
    get uiSchema(): UiSchema {
        return {
            items: {
                no: {
                    "name": "no",
                    "type": "string",
                    "isKey": true,
                    "widget": "text",
                    "label": "No",
                    "defaultValue": this.initNO,
                } as UiTextItem,
                name: {
                    "name": "name",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Name",
                } as UiTextItem,
                firstName: {
                    "name": "firstName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "First Name",
                } as UiTextItem,
                lastName: {
                    "name": "lastName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Last Name",
                } as UiTextItem,
                middleName: {
                    "name": "middleName",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Middle Name",
                } as UiTextItem,
                submit: {
                    "label": "Save " + this.caption,
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        }
    }
    abstract isInRole(role: Role): boolean;
    protected async loadList(): Promise<any[]> {
        let { BzWorkshop } = this.uqs;
        /*
        let list = await BzWorkshop.QueryID({
            IX: [BzWorkshop.IxPersonRole],
            ix: this.personRole,
            IDX: [this.ID],
            page: { start: 0, size: 10000 },
            order: 'desc',
        });
        */
        /*
        let list = await BzWorkshop.IXr({
            IX: BzWorkshop.IxPersonRole,
            IDX: [BzWorkshop.Person],
            ix: this.personRole,
            page: { start: 0, size: 10000 },
            order: 'desc',
        });
        */
        let result = await BzWorkshop.GetPersonList.query({ role: this.personRole });
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
        return ret;
    }

    async saveId(data: any) {
        let { BzWorkshop } = this.uqs;
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            ID: BzWorkshop.Person,
            values: [{
                ix: this.personRole,
                xi: data,
            }],
        });
        return ret[0];
    }

    async search(key: string): Promise<any[]> {
        let ret = await this.uqs.BzWorkshop.PersonSearch.query({
            role: this.personRole,
            key,
        });
        return ret.ret;
    }

    renderItemInList(item: any): JSX.Element {
        return renderPerson(item);
    }

    renderItemOnSelect(item: any): JSX.Element {
        return renderSelectPerson(item);
    }

    renderIdValue(item: IdValue): JSX.Element {
        return renderPerson(item);
    }

    get VEdit(): new (c: CIdBase) => VPage<CPerson> {
        return undefined; // VEditPerson as any;
    }

    renderCurrentUser(render: (user: User) => JSX.Element) {
        return react(() => {
            let { currentItem } = this.deepData;
            if (!currentItem) return null;
            let { user } = currentItem;
            return <VUser id={user} render={render} />;
        });
    }

    onBindUser = async () => {
        if (this.deepData.currentItem.user) {
            //this.open(VBound);
            return;
        }
        await this.onChangeUser();
    }

    onChangeUser = async () => {
        let ret = await selectUser('Bind user');
        if (!ret) return;
        let { currentItem } = this.deepData;
        let userId = ret.id;
        let { BzWorkshop } = this.uqs;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: userId, xi: currentItem.id }
            ]
        })
        setReact(() => {
            currentItem.user = userId;
        });
    }

    onRemoveBound = async () => {
        let { currentItem } = this.deepData;
        let { BzWorkshop } = this.uqs;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        this.close();
        setReact(() => {
            currentItem.user = undefined;
        });
    }
}
