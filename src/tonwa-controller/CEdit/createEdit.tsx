import { CDateEdit, CDateTimeEdit, CStringEdit, CTimeEdit } from "./CInputEdit";
import { CEdit, EditProps } from "./CEdit";
import { getAppBase } from "../AppBase";
import { CIdEdit } from "./CIdEdit";
import { CPickEdit } from "./CPickEdit";
import { CCheckEdit } from ".";

export function createEdit(props: EditProps): CEdit {
    let app = getAppBase();
    let { itemSchema, uiItem } = props;
    if (uiItem === undefined) {
        switch (itemSchema.type) {
            default: return new CStringEdit(app, props);
        }
    }
    switch (uiItem.widget) {
        case 'date': return new CDateEdit(app, props);
        case 'datetime': return new CDateTimeEdit(app, props);
        case 'time': return new CTimeEdit(app, props);
        case 'id': return new CIdEdit(app, props);
        case 'pick': return new CPickEdit(app, props);
        case 'checkbox': return new CCheckEdit(app, props);
        default: return new CStringEdit(app, props);
    }
}
