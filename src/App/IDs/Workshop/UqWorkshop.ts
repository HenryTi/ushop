import { UqID, UqIDProps } from "tonwa-controller";
import { Schema, UiPick, UiSchema, UiTextAreaItem, UiTextItem } from "tonwa-react";
import { UqExt } from "uq-app/uqs/BzWorkshop";
import { Workshop } from "uq-app/uqs/BzWorkshop";

export class UqWorkshop extends UqID {
    async loadList() {
        let list: Workshop[] = await this.uq.QueryID({
            ID: this.ID,
            page: { start: 0, size: 10 },
            order: 'desc',
        });
        return list;
    }

    readonly schema: Schema = [
        ...(this.uq as UqExt).Workshop.ui.fieldArr,
        { name: 'submit', type: 'submit' }
    ];
    uiSchema: UiSchema = {
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
                pick: undefined, //new CIdPick(this.cIds.cStaff, this.deepData.currentItem?.staff),
            } as UiPick,
            submit: {
                "label": "Save Workshop",
                "widget": "button",
                "className": "btn btn-primary",
            }
        }
    };
}

export function useUqWorkshop(props: UqIDProps) {
    return new UqWorkshop(props);
}