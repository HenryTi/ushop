import { CDateEdit, CDateTimeEdit, CStringEdit, CTimeEdit } from "./CInputEdit";
import { CEdit, EditProps } from "./CEdit";
import { AppBase } from "../AppBase";
import { CIdEdit } from "./CIdEdit";
import { CPickEdit } from "./CPickEdit";
import { CCheckEdit } from ".";

export function createEdit(nav: AppBase, props: EditProps): CEdit {
    let { itemSchema, uiItem } = props;
    if (uiItem === undefined) {
        switch (itemSchema.type) {
            default: return new CStringEdit(nav, props);
        }
    }
    switch (uiItem.widget) {
        case 'date': return new CDateEdit(nav, props);
        case 'datetime': return new CDateTimeEdit(nav, props);
        case 'time': return new CTimeEdit(nav, props);
        case 'id': return new CIdEdit(nav, props);
        case 'pick': return new CPickEdit(nav, props);
        case 'checkbox': return new CCheckEdit(nav, props);
        default: return new CStringEdit(nav, props);
    }
}
