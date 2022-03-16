import { CSelectOne, VEditID, VEditIDProps } from "tonwa-controller";
import { Schema, UiSchema, UiTextAreaItem, UiTextItem, UiPick, Pick } from "tonwa-react";
import { UqExt } from "uq-app/uqs/BzWorkshop";
import { VTagInput } from "../../Tag";
import { UqWorkshop } from "./UqWorkshop";
//import { VPickID } from "./VPickID";
import { VSessionList } from "./VSessionList";

interface VEditWorkshopProps extends VEditIDProps {
    uqID: UqWorkshop;
}

export function VEditWorkshop(props: VEditWorkshopProps) {
    let { uqID } = props;
    let { uq, state, initNO } = uqID;
    let BzWorkshop = uq as UqExt;
    let schema: Schema = BzWorkshop.Person.ui.fieldArr;
    let uiSchema: UiSchema = {
        items: {
            no: {
                "name": "no",
                "type": "string",
                "isKey": true,
                "widget": "text",
                "label": "No",
                "defaultValue": initNO,
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
                pick: new PickStaff(),
                //new CIdPick(this.cIds.cStaff, this.deepData.currentItem?.staff),
            } as UiPick,
            submit: {
                "label": "Save Workshop",
                "widget": "button",
                "className": "btn btn-primary",
            }
        }
    }
    return <div className="">
        <div className="my-3 border rounded-3 pt-1">
            <VEditID uqID={uqID} schema={schema} uiSchema={uiSchema} />
            {/*this.renderProps()*/}
        </div>
        {/*this.renderTagInput()*/}
        <VTagInput id={state.currentItem.id} />
        <div className="my-3 border rounded-3">
            {/*this.controller.cSession.renderList()*/}
            <VSessionList />
        </div>
    </div >;
}

class PickStaff implements Pick {
    ref(): JSX.Element {
        return <span>pick staff</span>;
    }
    async pick(): Promise<number> {
        alert('pick to be implemented');
        return 0;
        /*
        let cSelectOne = new CSelectOne(this.cId);
        let ret = await cSelectOne.select();
        let id = ret.id;
        this.deepValue.id = id;
        return id;
        */
    }
}
