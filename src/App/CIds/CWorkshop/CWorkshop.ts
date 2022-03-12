import { Schema, UiSchema, UiTextAreaItem, UiTextItem, UiPick } from "tonwa-react";
import { Uq } from "tonwa-uq";
import { IdValue } from "tonwa-contoller";
import { Workshop } from "uq-app/uqs/BzWorkshop";
import { CId } from "../CId";
import { renderWorkshopItem } from "./renderItem";
import { CIds } from "../CIds";
import { VEditWorkshop } from "./VEditWorkshop";
import { CSession } from "./CSession";
import { CIdPick } from "../CIdPick";
import { VAddWorkshop } from "./VAddWorkshop";

export class CWorkshop extends CId {
    readonly cSession: CSession;

    constructor(cIds: CIds) {
        super(cIds);
        this.cSession = new CSession(this);
    }
    get tagGroupName() { return 'workshop-tags'; }
    get uq(): Uq { return this.uqs.BzWorkshop; };
    getID() { return this.uqs.BzWorkshop.Workshop; }
    get caption() { return 'Workshop' }
    get icon() { return 'book'; }
    get iconClass(): string { return 'text-warning'; }
    get schema(): Schema {
        return this.uqs.BzWorkshop.Workshop.ui.fieldArr;
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
                    readOnly: true,
                } as UiTextItem,
                name: {
                    "name": "name",
                    "type": "string",
                    "isKey": false,
                    "widget": "text",
                    "label": "Name",
                } as UiTextItem,
                vice: {
                    "name": "vice",
                    "isKey": false,
                    "widget": "textarea",
                    "label": "Discription",
                    "placeholder": "Workshop discription",
                    "rows": 6,
                } as UiTextAreaItem,
                staff: {
                    name: 'staff',
                    widget: 'pick',
                    label: 'Staff',
                    pick: new CIdPick(this.cIds.cStaff, this.deepData.currentItem?.staff),
                } as UiPick,
                submit: {
                    "label": "Save Workshop",
                    "widget": "button",
                    "className": "btn btn-primary",
                }
            }
        };
    }

    protected async beforeEdit() {
        await super.beforeEdit();
        await this.cTagInput.beforeEdit(this.tagGroupName, this.deepData.currentItem.id);
        await this.cSession.loadToList()
    }

    protected async loadList(): Promise<any[]> {
        let list = await this.uqs.BzWorkshop.QueryID({
            ID: this.ID,
            page: { start: 0, size: 10 },
            order: 'desc',
        });
        return list;
    }

    async saveId(data: any) {
        let ret = await this.uqs.BzWorkshop.Acts({
            workshop: [data],
        });
        return ret.workshop[0];
    }

    renderItemInList(item: any): JSX.Element {
        return renderWorkshopItem(item);
    }

    get VAdd() { return VAddWorkshop as any; }
    get VEdit() { return VEditWorkshop as any; }

    renderIdValue(idValue: IdValue): JSX.Element {
        return renderWorkshopItem(idValue as Workshop);
    }

    async savePropValue(id: number, name: string, value: any): Promise<void> {
        let { BzWorkshop } = this.uqs;
        switch (name) {
            default:
                await BzWorkshop.ActIDProp(this.ID, id, name, value);
                break;
            case 'staff':
                await BzWorkshop.SaveWorkshopStaff.submit({ id, staff: value });
                break;
        }
    }
}
